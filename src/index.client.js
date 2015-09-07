import Application from './lib';
import HelloController from './HelloController';
import nunjucks from 'nunjucks';

// configure nunjucks to read from the dist directory
nunjucks.configure('/templates');

const application = new Application({
  '/{name*}': HelloController
}, {
  // query selector for the element in which
  // the controller response should be injected
  target: 'body'
});

application.start();
