import { Router } from 'express';
import { log } from './logger';
import { Logger } from 'log4js';

export abstract class Controller {
  public path: string;
  protected logger: Logger;

  constructor(path: string = '') {
    this.path = path;
    this.logger = log.getLogger(this.constructor.name);
  }

  public abstract routes(): Router;
}
