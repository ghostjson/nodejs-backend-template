import express, { Express } from 'express';
import { Controller } from './utils/controller';
import { log } from './utils/logger';
import { Logger } from 'log4js';
import { Database } from './database/couchdb';
import { config } from './utils/config';

class Server {
  private express: Express;
  private port: number;
  private logger: Logger = log.getLogger('Server');

  constructor(port?: number) {
    this.express = express();
    this.port = port ? port : 3000;

    if (config.COUCHDB_URL) {
      Database.setConnectionString(config.COUCHDB_URL);
    } else {
      this.logger.error('Connection string should be defined');
    }

    this.initialiseMiddleware();
  }

  private initialiseMiddleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.logger.info('All middlewares are initialised');
  }

  addControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.express.use(`/api${controller.path}`, controller.routes());
      this.logger.debug('controller loaded to the path' + controller.path);
    });
    this.logger.info('Controllers are loaded succesfully');
  }

  listen(): void {
    this.express.listen(this.port, () => {
      this.logger.info(`Listening to the port ${this.port}`);
    });
  }
}

export default Server;
