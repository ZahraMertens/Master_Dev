const { gql } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

const typeDefs = gql`

    type Student {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        userType: String
        order: [Order]
    }

    type Order {
        _id: ID
        purchaseDate: String
        tutors: [Tutor]
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
        hourRate: ID
        filenameImg: String
    }

    type AuthStudent {
        token: ID!
        student: Student
    }

    scalar Upload 

    type AuthTutor {
        token: ID!
        tutor: Tutor
    }

    type File {
        # filename: String!
        # mimetype: String!
        # encoding: String!
        filename: String!
    }

    type Checkout {
        session: ID
    }

    type Query {
        students: [Student]
        tutors: [Tutor]
        searchtutor(language: String): [Tutor]
        onetutor(tutorId: ID!): Tutor
        onestudent(studentId: ID!): Student
        meStudent: Student
        meTutor: Tutor
        checkout(tutors: [ID!]): Checkout
    }

    type Mutation {
        loginStudent(email: String!, password: String!): AuthStudent 
        loginTutor(email: String!, password: String!): AuthTutor
        addStudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): AuthStudent
        addTutor(firstName: String!, lastName: String!, email: String!, phone: String!, describtion: String!, language: String!, degree: String!, hourRate: ID!, password: String!, userType: String!, filenameImg: String): AuthTutor
        updateStudent(studentId: ID!, firstName: String!, lastName: String!, email: String!, password: String! ): AuthStudent
        uploadFile(file: Upload!): File!
    }  
`

module.exports = typeDefs;
//uploadFile(file: Upload!): File!
// type Auth {
//     token: ID!        ID has an unique identifier, in this case is the token
//     student: Student  Refers to student profile
// }