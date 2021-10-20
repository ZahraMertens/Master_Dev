const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Student {
        _id: ID
        firstName: String
        lastName: String
        email: String
        pasword: String
        userType: String
    }

    type Tutor {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        pasword: String
        userType: String
        describtion: String
        language: String
        degree: String
        hourRate: Int
    }

    type Query {
        students: [Student]
        tutors: [Tutor]
        searchtutor(language: String): [Tutor]
    }

    type Mutation {
        addstudent(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Student
    }
`

module.exports = typeDefs;