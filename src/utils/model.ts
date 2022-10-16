import { ObjectSchema } from 'joi';

export abstract class Schema {
  abstract schema: ObjectSchema<any>;

  public validateSchema(data: any) {
    return this.schema.validate(data);
  }
}
