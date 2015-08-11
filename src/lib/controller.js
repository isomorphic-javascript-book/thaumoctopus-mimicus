export default class Controller {

  constructor(context) {
    this.context = context;
  }

  index(application, request, reply, promise) {
    promise.resolve();
  }

  toString(promise) {
    promise.resolve('success');
  }

}