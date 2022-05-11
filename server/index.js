const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const swaggerUi = require('swagger-ui-express');

const { logger, requests } = require('./logger');
const api = require('./api/v1');
const docs = require('./api/v1/docs');

const app = express();

// cors
app.use(
  cors({
    origin: '*',
  }),
);

// Add unique ID to every request
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Log every incoming request
app.use(requests);

// parse application/json
app.use(express.json());

// set API version
app.use('/api/v1', api);

// Docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(docs));

// Middleware to handle Not Route Found
app.use((req, res, next) => {
  next({
    message: 'Route Not Found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error Middleware
app.use((err, req, res, next) => {
  const { message = '', level = 'error' } = err;
  let { statusCode = 500 } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  const log = `${logger.header(req)} ${statusCode} ${message}`;
  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
