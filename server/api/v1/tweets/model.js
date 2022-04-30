const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  likes: {
    type: Number,
    default: 0,
  },
};

const tweet = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('tweet', tweet),
  fields,
};
