import Server from './src/server';
import { DemoController } from './src/modules/demo/demo.controller';

const server = new Server();
server.addControllers([new DemoController()]);

server.listen();
