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