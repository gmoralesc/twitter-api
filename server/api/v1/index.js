const express = require('express');
// eslint-disable-next-line
const router = express.Router();

const tweets = require('./tweets/routes');
const users = require('./users/routes');
const comments = require('./comments/routes');

router.use('/tweets', tweets);
router.use('/users', users);
router.use('/comments', comments);

module.exports = router;
