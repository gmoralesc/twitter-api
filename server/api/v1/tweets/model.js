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

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const virtuals = {
  comments: {
    ref: 'comment',
    localField: '_id',
    foreignField: 'tweetId',
  },
};

const tweet = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

tweet.virtual('comments', virtuals.comments);

module.exports = {
  Model: mongoose.model('tweet', tweet),
  fields,
  references,
  virtuals,
};
