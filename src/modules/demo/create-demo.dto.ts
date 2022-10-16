import { ObjectSchema } from 'joi';
import { DTO } from './../../utils/dto';
import Joi from 'joi';

export class CreateDemoDTO extends DTO {
  protected schema: ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
  });
}
