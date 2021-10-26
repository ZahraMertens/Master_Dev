const { AuthenticationError } = require("apollo-server-express");
const { Student, Tutor } = require("../models");
const { signToken } = require("../utils/auth");

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
        return Student.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    meTutor: async (parent, args, context) => {
      if (context.user) {
        return Tutor.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    onestudent: async (parent, { studentId }) => {
      return Student.findOne({ _id: studentId });
    },
  },

  Mutation: {
    loginStudent: async (parent, { email, password }) => {
        const student = await Student.findOne({ email });

        if (!student) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
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
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await tutor.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(tutor);

        return { token, tutor };
    },
    //Parse all attributes from signup page to args param and deconstruct
    addStudent: async (parent, {firstName, lastName, email, password, userType}) => {
        const student = await Student.create({ firstName, lastName, email, password, userType });
        //Imported sign token 
        const token = signToken(student)
        //Return token and profile
        return { token, student }
    },
    addTutor: async (parent, { firstName, lastName, email, phone, password, userType, describtion, language, degree, hourRate }) => {
        const tutor = await Tutor.create({ firstName, lastName, email, phone, password, userType, describtion, language, degree, hourRate });
        const token = signToken(tutor)
        return { token, tutor }
    },
    updateStudent: async (parent, { studentId, firstName, lastName, email, password }, context) => {
      if(context.user){
        return Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        )
      }
      throw new AuthenticationError('Something went wrong!');
    }
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
