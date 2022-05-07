const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const validator = require('validator');

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
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message(props) {
        return `${props.value} is not a valid email`;
      },
    },
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

user.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// findByIdAndUpdate is wrapper of indOneAndUpdate
user.pre('findOneAndUpdate', async function (next) {
  // this._update has any modified property
  if (this._update.password) {
    this._update.password = await hash(this._update.password, 10);
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
