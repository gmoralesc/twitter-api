const mongoose = require('mongoose');
<<<<<<< HEAD
const { logger } = require('./logger');
=======
>>>>>>> main

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

  // process.on('SIGINT', function () {
  //   mongoose.connection.close(function () {
  //     console.log('Database discconnected');
  //   });
  // });
};

exports.disconnect = function () {
  mongoose.connection.close(function () {
<<<<<<< HEAD
    logger.info('Database discconnected');
=======
    console.log('Database discconnected');
>>>>>>> main
  });
};
