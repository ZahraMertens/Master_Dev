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
    }
}

module.exports = resolvers;