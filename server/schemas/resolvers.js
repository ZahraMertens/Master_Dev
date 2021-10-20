const { AuthenticationError } = require('apollo-server-express');
const { Student, Tutor } = require("../models");

const resolvers = {
    Query: {
        users: async () => {
            return Student.find();
        },
    }
}

module.exports = resolvers;