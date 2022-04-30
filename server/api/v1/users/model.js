const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

user.virtual('name').get(function () {
  return this.firstname + ' ' + this.lastname;
});

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
