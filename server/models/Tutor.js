const { Schema, model } = require("mongoose");

const tutorSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  describtion: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  hourRate: {
    type: String,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  tutor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Tutor = model("Tutor", tutorSchema);

module.exports = Tutor;
