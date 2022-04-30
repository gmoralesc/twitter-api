const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

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
  toObject: {
    virtuals: true,
  },
});

user.virtual('name').get(function () {
  return this.firstname + ' ' + this.lastname;
});

user.pre(['save', 'findByIdAndUpdate'], async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function (password = '') {
  return compare(password, this.password);
};

user.methods.toJSON = function () {
  const doc = this.toObject();
  delete doc.password;
  return doc;
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
