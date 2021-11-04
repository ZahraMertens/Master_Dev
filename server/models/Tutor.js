const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

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
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  filenameImg: {
    type: String,
    required: false,
  },
  description: {
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
    type: Number,
    required: true,
  },
  zoomPMI: {
    type: String,
    required: true,
  },
  zoomPass: {
    type: String,
    required: true,
  }
});

//Before save bcrypt password
tutorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//Compare password with the existinh hahsed password
tutorSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Tutor = model("Tutor", tutorSchema);

module.exports = Tutor;
