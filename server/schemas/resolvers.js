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
      console.log(context.user.email);
      console.log(args); //{ tutorId: '6179f5cd414ea60ded380596' }
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ tutors: args.tutorId });
      
      console.log(order);
      //Returns Object
      // {
      //      tutors: [ new ObjectId("6179f5cd414ea60ded380596") ],
      //      _id: new ObjectId("617ca0c9ebe6dea8b1ec8b86"),
      //     purchaseDate: 2021-10-30T01:32:57.949Z
      //  }
      
      const line_items = [];

      const { tutors } = await order.populate("tutors").execPopulate();
      console.log(tutors);

      const tutor = await stripe.tutors.create({
        name: tutors[0].firstName + tutors[0].lastName,
        description: "Online Tutoring Session",
      });

      const price = await stripe.prices.create({
        tutor: tutor.id,
        unit_amount: tutors[0].hourRate * 100,
        currency: "usd",
      });

      line_items.push({
        price: price.id,
        quantity: 1,
      });
      //Tells stripe the items in the order
      // Create stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      console.log(session)
      return { session: session.id };
      // const transporter = nodemailer.createTransport({
      //   service: "hotmail",
      //   auth: {
      //     user: "master_dev-test@outlook.com",
      //     pass: "masterdev1234!",
      //   },
      // });

      // //Send to student and tutor from masterdev email
      // const maillist = [
      //   args.email, //selected tutor email
      //   context.user.email, //current logged in student email
      // ];

      // const options = {
      //   from: "master_dev-test@outlook.com",
      //   to: maillist,
      //   subject: "Congrats! You have an upcoming tutoring session!",
      //   text: `Hi Master Dev's, you have an upcoming session, pleadetails below:`,
      //   html: `<h1>Hi Master Dev's,</h1>
      //          <br/>
      //          <p>You have an upcoming sessiosion</p>`,
      // };

      // transporter.sendMail(options, function (error, info) {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //   console.log("Sent", info.response);
      // });

      
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

      if (token) {
        const transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "master_dev-test@outlook.com",
            pass: "masterdev1234!",
          },
        });

        //
        const maillist = [args.email, "zahra.mertens@googlemail.com"];

        const options = {
          from: "master_dev-test@outlook.com",
          to: maillist,
          subject: "Congrats! You have an upcoming tutoring session!",
          text: `Hi Master Dev's, you have an upcoming session, pleadetails below:`,
          html: `<h1>Hi Master Dev's,</h1>
                 <br/>
                 <h2>You have an upcoming session, please find the details below:</h2>
                 <br/>
                 <ul>
                 <li>Tutor: Name</li>
                 <li>Zoom URL: www.ededee.com</li>
                 <li>Zoom Password: dbekfebda</li>
                 <li>Student Email: ${args.email}</li>
                 <li>Tutor Email: bejhfberjfe</li>
                 </ul>
                 <br/>
                 <h2>Happy Hacking!</h2>
                 <p>Your Master Dev Team</p>
                 `,

        };

        transporter.sendMail(options, function (error, info) {
          if (error) {
            console.log(error);
            return;
          }
          console.log("Sent", info.response);
        });
      }
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
  },
};

module.exports = resolvers;

// QUERY DATA GRAPHQL

// {
//     "firstName": "Anna",
//     "lastName": "Doe",
//     "email": "anna@test.com",
//     "phone": "0410234567",
//     "password": "test1234",
//     "userType": "Tutor",
//     "describtion": "I have 10 years experience",
//     "language": "JavaScript",
//     "degree": "Bootcamp Certificate",
//     "hourRate": 32
//   }

// query students {
//     students {
//       firstName
//       lastName
//       email
//       pasword
//       userType
//       _id
//     }
//   }

//   mutation AddstudentMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userType: String!) {
//     addstudent(firstName: $firstName, lastName: $lastName, email: $email, password: $password, userType: $userType) {
//       firstName
//       lastName
//       email
//       pasword
//       userType
//     }
//   }

//   query tutors {
//     tutors {
//       _id
//       firstName
//       lastName
//       email
//       phone
//       pasword
//       userType
//       describtion
//       language
//       degree
//       hourRate
//     }
//   }

//   query searchtutor($language: String) {
//     searchtutor(language: $language) {
//       _id
//       firstName
//       lastName
//       email
//       phone
//       pasword
//       userType
//       describtion
//       language
//       degree
//       hourRate
//     }
//   }

//   mutation addtutor($firstName: String!, $lastName: String!, $email: String!, $password: String!, $userType: String!, $phone: String!, $describtion: String!, $language: String!, $degree: String!, $hourRate: Int!) {
//     addtutor(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, password: $password, userType: $userType, describtion: $describtion, language: $language, degree: $degree, hourRate: $hourRate) {
//       firstName
//       lastName
//       email
//       phone
//       password
//       userType
//       describtion
//       language
//       degree
//       hourRate
//     }
//   }
