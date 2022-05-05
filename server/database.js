const mongoose = require('mongoose');
const { logger } = require('./logger');

exports.connect = function ({
  protocol = 'mongodb',
  url = '',
  username,
  password,
}) {
  let dburl = '';
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl);

  mongoose.connection.on('open', function () {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', function () {
    logger.info('Database discconnected');
  });

  mongoose.connection.on('error', function (error) {
    logger.error(error);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      logger.info('Database discconnected');
    });
  });
};

exports.disconnect = function () {
  mongoose.connection.close(function () {
    logger.info('Database discconnected');
  });
};
