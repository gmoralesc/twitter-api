const express = require('express');
// eslint-disable-next-line
const router = express.Router();

const tweets = require('./tweets/routes');

router.use('/tweets', tweets);

module.exports = router;
