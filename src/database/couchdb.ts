import axios from 'axios';
import { Logger } from 'log4js';
import { log } from './../utils/logger';

export class Database {
  private static connectionString: string;
  private static logger: Logger = log.getLogger('Database - couchdb.ts');

  static setConnectionString(connectionString: string) {
    Database.logger.info('Connection string is set for database');
    Database.connectionString = connectionString;
  }

  static getConection() {
    if (Database.connectionString) {
      return axios.create({
        baseURL: Database.connectionString,
        timeout: 1000,
      });
    } else {
      const errorMessage = 'Connection string is not defined for database';
      Database.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
