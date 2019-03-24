import { createLogger, format, transports } from 'winston'
import path from 'path'

const logger = caller => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.label({ label: path.basename(caller) }),
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(
        info =>
          `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      )
    ),
    transports: [new transports.Console()]
  });
};

module.exports = logger;