const mongoose = require('mongoose');

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
    console.log('Database connected');
  });

  mongoose.connection.on('close', function () {
    console.log('Database discconnected');
  });

  mongoose.connection.on('error', function (error) {
    console.error(error);
  });

  process.on('SIGINT', function () {
    mongoose.connect.close(function () {
      console.log('Database discconnected');
    });
  });
};

exports.disconnect = function () {
  mongoose.connect.close(function () {
    console.log('Database discconnected');
  });
};
