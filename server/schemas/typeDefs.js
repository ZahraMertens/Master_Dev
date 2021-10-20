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

    type Query {
        students: [Student]
    }
`

module.exports = typeDefs;