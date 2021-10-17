const { Schema, model } = require('mongoose');

const tutorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {

    },
    password: {

    },
    userType: {
        //tutor
    },
    filename: {
        
    },
    describtion: {

    },
    language: {

    },
    degree: {

    },
    hourRate: {

    },
    availability: {

    },
    rating: {

    }
  }
);

const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;