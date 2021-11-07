const { gql } = require('apollo-server-express');
// const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

const typeDefs = gql`

    type Student {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        userType: String
        orders: [Order]
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
        description: String
        language: String
        degree: String
        hourRate: ID
        filenameImg: String
        zoomPMI: String
        zoomPass: String
    }

    type AuthStudent {
        token: ID!
        student: Student
    }

    # scalar Upload 

    type AuthTutor {
        token: ID!
        tutor: Tutor
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
        order(_id: ID!): Order
        checkout(tutors: [ID]!): Checkout
    }

    type Mutation {
        addOrder(tutors: [ID]!): Order
        loginStudent(email: String!, password: String!): AuthStudent 
        loginTutor(email: String!, password: String!): AuthTutor
        addStudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): AuthStudent
        addTutor(firstName: String!, lastName: String!, email: String!, phone: String!, description: String!, language: String!, degree: String!, hourRate: ID!, password: String!, userType: String!, filenameImg: String, zoomPass: String!, zoomPMI: String!): AuthTutor
        updateStudent(studentId: ID, firstName: String, lastName: String, email: String, password: String ): AuthStudent
        updateTutor(tutorId: ID, firstName: String, lastName: String, email: String, phone: String, description: String, language: String, degree: String, hourRate: ID, filenameImg: String, zoomPass: String, zoomPMI: String): AuthTutor

    }  
`

module.exports = typeDefs;
