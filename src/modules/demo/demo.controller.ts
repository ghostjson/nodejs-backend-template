import { Controller } from '../../utils/controller';
import { Router, Request, Response } from 'express';
import { Demo } from './demo.model';
import { DemoService } from './demo.service';
import { CreateDemoDTO } from './create-demo.dto';

export class DemoController extends Controller {
  public path: string = '/demo';
  demos: Demo[] = [
    {
      name: 'demo1',
      age: 12,
    },
    {
      name: 'demo2',
      age: 22,
    },
  ];

  private demoService = new DemoService();

  public routes(): Router {
    const demoRouter = Router();
    demoRouter.get('/', this.getAllDemos);
    demoRouter.get('/:name', this.getDemoByName);
    demoRouter.post('/:name', this.createDemo);
    return demoRouter;
  }

  createDemo = (request: Request, response: Response): void => {
    const demo: Demo = request.body;

    const createDemoDTO = new CreateDemoDTO(response);
    const validate = createDemoDTO.validate(demo);

    if (validate.error) {
      response.send(validate.error.details);
    } else {
      this.demoService.createDemo(demo);
      response.status(204).send('Created');
    }
  };

  getAllDemos = async (request: Request, response: Response): Promise<void> => {
    const demos = await this.demoService.getDemos();
    response.send(demos);
  };

  getDemoByName = (request: Request, response: Response): void => {
    const name = request.params.name;
    console.log(this.demos);
    const demo: Demo = this.demos.filter((demo) => demo.name === name)[0];
    if (demo) {
      response.send(demo);
    } else {
      response.status(404).send({
        message: 'Not Found',
      });
    }
  };
}
