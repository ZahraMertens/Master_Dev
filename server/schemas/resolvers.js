const { AuthenticationError } = require('apollo-server-express');
const { Student, Tutor } = require("../models");

const resolvers = {
    Query: {
        students: async () => {
            return Student.find();
        },
        tutors: async () => {
            return Tutor.find();
        },
        searchtutor: async (parent, {language}) => {
            const params = language ? { language } : {};
            return Tutor.find(params);
        }
    },

    Mutation: {
        addstudent: async (parent, {firstName, lastName, email, password, userType}) => {
            const student = await Student.create({ firstName, lastName, email, password, userType });
            return student
        },
        addtutor: async (parent, { firstName, lastName, email, phone, password, userType, describtion, language, degree, hourRate }) => {
            const tutor = await Tutor.create({ firstName, lastName, email, phone, password, userType, describtion, language, degree, hourRate });
            return tutor
        }
    }
}

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