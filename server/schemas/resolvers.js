require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");
const { Student, Tutor, Order } = require("../models");
const { signToken } = require("../utils/auth");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(`${process.env.STRIPE_SK}`);

const resolvers = {

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
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ tutors: args.tutors });

      const line_items = [];

      const { tutors } = await order.populate("tutors");

      //As only one tutor in array it returns only one product
      for (let i = 0; i < tutors.length; i++) {
        const product = await stripe.products.create({
          name: `Tutor name: ${tutors[i].firstName} ${tutors[i].lastName}`,
          description: `One hour online tutoring session with ${tutors[i].firstName} to improve your coding skills and solve problems. Powered by MasterDev Tutoring`,
          images: [`${tutors[0].filenameImg}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: tutors[i].hourRate * 100,
          currency: "aud",
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

      //Creating session to be able to redirect to checkout platform of stripe in frontend
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
      {
        tutorId,
        firstName,
        lastName,
        email,
        phone,
        hourRate,
        description,
        language,
        degree,
        filenameImg,
        zoomPass,
        zoomPMI,
      },
      context
    ) => {
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
      
      const tutorId = tutors[0];
     
      if (context.user) {
        const tutor = await Tutor.findById(tutorId).exec();
       
        const array = [tutor];
        

        if (tutor) {
          const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: "master_dev-test@outlook.com",
              pass: "masterdev1234!",
            },
          });

          //Send to student and tutor from masterdev email
          const maillist = [
            tutor.email, //selected tutor email
            context.user.email, //current logged in student email
          ];

          const options = {
            from: "master_dev-test@outlook.com",
            to: maillist,
            subject: "Congrats! You have an upcoming tutoring session!",
            text: `Hi Master Dev's, you have an upcoming session! All details are below:`,
            html: `<h1>Hi Master Dev's,</h1>
               <br/>
               <h2>You have an upcoming session. All student and tutor details are below:</h2>
               <br/>
               <ul>
               <li>Tutor: ${tutor.firstName} ${tutor.lastName}</li>
               <li>Zoom URL: ${tutor.zoomPMI}</li>
               <li>Zoom Password: ${tutor.zoomPass}</li>
               <li>Student Email: ${context.user.email}</li>
               <li>Tutor Email: ${tutor.email}</li>
               <li>Tutor Phone: ${tutor.phone}</li>
               </ul>
               <br/>
               <p>We hope you enjoy our services!</p>
               <p>If you have any trouble with organising a session please do not hesitate to contact us at master_dev-test@outlook.com.</p>
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

        //add tutor to student order
        const order = new Order({ tutors: tutor });

        await Student.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { orders: order },
          }
        ); 

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
