const mongoose = require('mongoose');

const fields = {
  content: String,
  likes: Number,
};

module.exports = mongoose.model('tweet', fields);
