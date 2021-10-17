const { Schema, model } = require('mongoose');

const studentSchema = new Schema(
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
        //student 
    },
  }
);

const Student = model('Student', studentSchema);

module.exports = Student;