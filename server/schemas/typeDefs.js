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
        hourRate: ID
    }

    type AuthStudent {
        token: ID!
        student: Student
    }

    type AuthTutor {
        token: ID!
        tutor: Tutor
    }

    # type File {
    #     filename: String!
    #     mimetype: String!
    #     encoding: String!
    #     url: String!
    # }

    type Query {
        students: [Student]
        tutors: [Tutor]
        searchtutor(language: String): [Tutor]
        onetutor(tutorId: ID!): Tutor
        onestudent(studentId: ID!): Student
        meStudent: Student
        meTutor: Tutor
    }

    type Mutation {
        loginStudent(email: String!, password: String!): AuthStudent 
        loginTutor(email: String!, password: String!): AuthTutor
        addStudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): AuthStudent
        addTutor(firstName: String!, lastName: String!, email: String!, phone: String!, describtion: String!, language: String!, degree: String!, hourRate: ID!, password: String!, userType: String!): AuthTutor
        updateStudent(studentId: ID!, firstName: String!, lastName: String!, email: String!, password: String!): AuthStudent
    }  
`

module.exports = typeDefs;
//uploadFile(file: Upload!): File!
// type Auth {
//     token: ID!        ID has an unique identifier, in this case is the token
//     student: Student  Refers to student profile
// }