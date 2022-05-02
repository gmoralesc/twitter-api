const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  tweetId: {
    type: Schema.Types.ObjectId,
    ref: 'tweet',
    required: true,
  },
};

const sanatizers = [body('content').escape()];

const comment = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('comment', comment),
  fields,
  references,
  sanatizers,
};
