import Application from './lib';
import HelloController from './hello-controller';
import templates from './templates';

const application = new Application({
  '/{name*}': HelloController
}, {
  target: 'body'
});

application.start();
