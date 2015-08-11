import Hapi from 'hapi';
import Application from './lib';
import Controller from './lib/controller'

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const application = new Application({
  '/': Controller
}, {
  server: server
});

application.start();