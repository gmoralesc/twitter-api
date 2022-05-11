const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

const logger = createLogger({
  format: format.simple(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

logger.header = (req) => {
  const date = new Date().toISOString();
  return `${req.ip} [${date}] ${req.id} "${req.method} ${req.originalUrl}"`;
};

// Add Request ID to morgan
morgan.token('id', (req) => req.id);

const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';
const requests = morgan(requestFormat, {
  stream: { write: (message) => logger.info(message.trim()) },
});

module.exports = {
  logger,
  requests,
};
