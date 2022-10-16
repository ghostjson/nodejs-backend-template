import log4js from 'log4js';
import { config } from './config';

log4js.configure({
  appenders: {
    everything: {
      type: 'file',
      filename: config.LOG_PATH || 'application.log',
    },
    console: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['everything', 'console'],
      level: 'debug',
    },
  },
});

export const log = log4js;
