import Joi, { ObjectSchema } from 'joi';
import { Response } from 'express';

export abstract class DTO {
  protected abstract schema: ObjectSchema<any>;
  private response: Response;

  constructor(res: Response) {
    this.response = res;
  }

  public validate(data: any) {
    return this.schema.validate(data);
  }
}

export const validateObject = (input: object) => {
  const schema = Joi.object().keys({
    home: Joi.string().required(),
    test: Joi.any(),
  });

  return schema.validate(input);
};
