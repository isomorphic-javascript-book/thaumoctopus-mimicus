import Hapi from 'hapi';
import Application from './lib';
import HelloController from './hello-controller';

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const application = new Application({
  '/{name*}': HelloController
}, {
  server: server
});

application.start();