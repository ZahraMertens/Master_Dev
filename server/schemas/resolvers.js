const { AuthenticationError } = require("apollo-server-express");
const { Student, Tutor } = require("../models");
const { signToken } = require("../utils/auth");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const stripe = require("stripe")

const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

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
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
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
    addStudent: async (
      parent,
      { firstName, lastName, email, password, userType }
    ) => {
      
      const student = await Student.create({
        firstName,
        lastName,
        email,
        password,
        userType,
      });
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
      console.log(studentId)
      if (context.user) {
        const student = await  Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password ? await bcrypt.hash(password, saltRounds) : undefined,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if(!student){
          throw new AuthenticationError("Can't update student!");
        }

        const token = signToken(student);

        return { token, student }
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
        console.log(randomfileName)
        //stream: The upload stream of the file(s) we’re uploading. We can pipe a Node.js stream to the filesystem or other cloud storage locations.
        const stream = createReadStream(); //return nodestream/file
        const pathName = path.join(__dirname, "..", `public/uploads/${randomfileName}`);
        await stream.pipe(fs.createWriteStream(pathName));
        console.log(pathName)
        return { //{ filename, mimetype, encoding }
          filename: randomfileName
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
