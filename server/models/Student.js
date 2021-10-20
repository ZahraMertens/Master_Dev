const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  // tutor: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Tutor",
  //   },
  // ],
});

const Student = model("Student", studentSchema);

module.exports = Student;
