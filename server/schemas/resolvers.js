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
    }
}

module.exports = resolvers;