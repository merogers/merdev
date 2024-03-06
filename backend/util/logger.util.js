const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, cli, align, printf, errors } = winston.format;

const env = process.env.NODE_ENV || 'development';

// Production Logging
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A',
    }),
    align(),
    printf((info) => `[ ${info.timestamp} ] ${info.level}: ${info.message} ${info.stack}`),
  ),
  transports: [
    new WinstonDailyRotateFile({
      filename: './logs/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
  ],
});

// Development Logging to Console
if (env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: cli(),
      level: 'info',
    }),
  );
}

module.exports = { logger };
