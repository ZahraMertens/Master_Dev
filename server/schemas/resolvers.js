const { AuthenticationError } = require("apollo-server-express");
const { Student, Tutor, Order } = require("../models");
const { signToken } = require("../utils/auth");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51JljitDQYZbnuPWjFE77MAAutk0J7amTagQjWx3mKQADSp9bkfddoZgfUyovoP6KDEJ1QkAIxyqWLTrFNY8lLfkF00L8ws4HOy"
);

const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

function generateString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Query: {
    students: async () => {
      return Student.find();
    },
    tutors: async () => {
      return Tutor.find();
    },
    searchtutor: async (parent, { language }) => {
      const params = language ? { language } : {};
      return Tutor.find(params);
    },
    onetutor: async (parent, { tutorId }) => {
      return Tutor.findOne({ _id: tutorId });
    },
    meStudent: async (parent, args, context) => {
      if (context.user) {
        return Student.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    meTutor: async (parent, args, context) => {
      if (context.user) {
        return Tutor.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    onestudent: async (parent, { studentId }) => {
      return Student.findOne({ _id: studentId });
    },
    checkout: async (parent, args, context) => {
      //console.log(args.tutors); //[ '617fb3578e685039ba13b474' ]
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ tutors: args.tutors });

      //console.log(order);

      const line_items = [];

      const { tutors } = await order.populate("tutors");
      //console.log(tutors);
      //console.log(tutors[0].firstName);

      for (let i = 0; i < tutors.length; i++) {
        const product = await stripe.products.create({
          name: tutors[i].firstName,
          description: "Online Tutoring Session",
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: tutors[i].hourRate * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      //Tells stripe the items in the order
      // Create stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      //console.log(session);

      //Creating session to be able to redirect to checkout platform of stripe
      return { session: session.id };
    },
  },

  Mutation: {
    loginStudent: async (parent, { email, password }) => {
      const student = await Student.findOne({ email });

      if (!student) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await student.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(student);

      return { token, student };
    },
    loginTutor: async (parent, { email, password }) => {
      const tutor = await Tutor.findOne({ email });

      if (!tutor) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await tutor.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(tutor);

      return { token, tutor };
    },
    //Parse all attributes from signup page to args param and deconstruct
    addStudent: async (parent, args) => {
      const student = await Student.create(args);
      //Imported sign token
      const token = signToken(student);
      //Return token and profile
      return { token, student };
    },
    addTutor: async (parent, args) => {
      const tutor = await Tutor.create(args);
      const token = signToken(tutor);
      return { token, tutor };
    },
    updateStudent: async (
      parent,
      { studentId, firstName, lastName, email, password }, //password
      context
    ) => {
      const saltRounds = 10;
      console.log(studentId);
      if (context.user) {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
                ? await bcrypt.hash(password, saltRounds)
                : undefined,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!student) {
          throw new AuthenticationError("Can't update student!");
        }

        const token = signToken(student);

        return { token, student };
      }
      throw new AuthenticationError("Something went wrong!");
    },
    updateTutor: async (
      parent,
      { tutorId, firstName, lastName, email, phone, hourRate, description, language, degree, filenameImg, zoomPass, zoomPMI}, //password
      context
    ) => {
      const saltRounds = 10;
      console.log(tutorId);
      if (context.user) {
        const tutor = await Tutor.findOneAndUpdate(
          { _id: tutorId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              hourRate: hourRate,
              description: description,
              language: language,
              degree: degree,
              filenameImg: filenameImg,
              zoomPass: zoomPass,
              zoomPMI: zoomPMI,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!tutor) {
          throw new AuthenticationError("Can't update tutor!");
        }

        const token = signToken(tutor);

        return { token, tutor };
      }
      throw new AuthenticationError("Something went wrong!");
    },
    addOrder: async (parent, { tutors }, context) => {
      console.log(tutors); //array with id ["0w2322"]
      const tutorId = tutors[0]
      console.log(tutorId) //"333"
      //console.log(context);
      if (context.user) {
        const tutor = await Tutor.findById(tutorId).exec();
        console.log(tutor);

        const obj = { _id: tutors[0], firstName: "Sam" }

        const order = new Order({ tutors: obj });
        console.log(order)

        await Student.findByIdAndUpdate({_id: context.user._id}, {
          $push: { orders: order },
        })//.populate("orders");

        return order;
      }

      throw new AuthenticationError("Not logged in");
        //const array = [tutor]
        //console.log(array)

        // if (tutor) {
        //   const transporter = nodemailer.createTransport({
        //     service: "hotmail",
        //     auth: {
        //       user: "master_dev-test@outlook.com",
        //       pass: "masterdev1234!",
        //     },
        //   });

        //   console.log(tutor.email);

        //   //Send to student and tutor from masterdev email
        //   const maillist = [
        //     tutor.email, //selected tutor email
        //     context.user.email, //current logged in student email
        //   ];

        //   console.log(maillist)

        //   const options = {
        //     from: "master_dev-test@outlook.com",
        //     to: maillist,
        //     subject: "Congrats! You have an upcoming tutoring session!",
        //     text: `Hi Master Dev's, you have an upcoming session, pleadetails below:`,
        //     html: `<h1>Hi Master Dev's,</h1>
        //        <br/>
        //        <h2>You have an upcoming session, please find the details below:</h2>
        //        <br/>
        //        <ul>
        //        <li>Tutor: ${tutor.firstName} ${tutor.lastName}</li>
        //        <li>Zoom URL: ${tutor.zoomPMI}</li>
        //        <li>Zoom Password: ${tutor.zoomPass}</li>
        //        <li>Student Email: ${context.user.email}</li>
        //        <li>Tutor Email: ${tutor.email}</li>
        //        <li>Tutor Phone: ${tutor.phone}</li>
        //        </ul>
        //        <br/>
        //        <h2>Happy Hacking!</h2>
        //        <p>Your Master Dev Team</p>
        //        `,
        //   };

        //   transporter.sendMail(options, function (error, info) {
        //     if (error) {
        //       console.log(error);
        //       return;
        //     }
        //     console.log("Sent", info.response);
        //   });
        // }

    },
    //The file object that we get from the second parameter of the uploadFile
    //resolver is a Promise that resolves to an Upload type with the following attributes:
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      console.log(filename);

      //const {ext} = path.parse(filename)
      const randomfileName = generateString(12) + filename;
      console.log(randomfileName);
      //stream: The upload stream of the file(s) we’re uploading. We can pipe a Node.js stream to the filesystem or other cloud storage locations.
      const stream = createReadStream(); //return nodestream/file
      const pathName = path.join(
        __dirname,
        "..",
        `public/uploads/${randomfileName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      console.log(pathName);
      return {
        //{ filename, mimetype, encoding }
        filename: randomfileName,
        //url: `http://localhost:3001/images/${randomfileName}`,
      };
    },
    // successPayment: async (parent, args, context) => {
    //   console.log(args)
    // }
  },
};

module.exports = resolvers;

