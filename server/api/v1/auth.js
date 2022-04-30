const { sign, verify } = require('jsonwebtoken');

const config = require('./../../config');

const signToken = function (payload, expiresIn = config.token.expires) {
  return sign(payload, config.token.secret, {
    expiresIn,
  });
};

const auth = (req, res, next) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  }

  if (token) {
    verify(token, config.token.secret, function (err, decoded) {
      if (!err) {
        req.decoded = decoded;
        next();
      } else {
        next({
          statusCode: 401,
          message: 'Unauthorized',
        });
      }
    });
  } else {
    next({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
};

const owner = (req, res, next) => {
  const { doc = {}, decoded = {} } = req;

  if (doc.userId.id === decoded.id) {
    next();
  } else {
    next({
      statusCode: 403,
      message: 'Forbidden',
    });
  }
};

module.exports = {
  signToken,
  auth,
  owner,
};
