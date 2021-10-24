const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Student {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        userType: String
    }

    type Tutor {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        password: String
        userType: String
        describtion: String
        language: String
        degree: String
        hourRate: Int
    }

    type Auth {
        token: ID!
        student: Student
    }

    type Query {
        students: [Student]
        tutors: [Tutor]
        searchtutor(language: String): [Tutor]
        onetutor(tutorId: ID!): Tutor
    }

    type Mutation {
        loginStudent(email: String!, password: String!): Auth 
        addStudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
    }  
`

module.exports = typeDefs;

// type Auth {
//     token: ID!        ID has an unique identifier, in this case is the token
//     student: Student  Refers to student profile
// }

//loginTutor(email: String!, password: String!): Auth

// type Mutation {
//         addstudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
//         addtutor(firstName: String!, lastName: String!, email: String!, phone: String!, password: String!, userType: String!, describtion: String!, language: String!, degree: String!, hourRate: Int!): Auth
//     }


//for query without authentication
// addstudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Student
//         addtutor(firstName: String!, lastName: String!, email: String!, phone: String!, password: String!, userType: String!, describtion: String!, language: String!, degree: String!, hourRate: Int!): Tutor