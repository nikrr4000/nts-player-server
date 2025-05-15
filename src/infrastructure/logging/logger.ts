import pino from 'pino';
import { config } from '@infrastructure/config';

export const logger = pino({
  level: config.logging.level,
  transport: config.isProduction 
    ? undefined 
    : { 
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
});

export default logger;
