import Controller from './lib/Controller';

export default class HomeController extends Controller {

  index(application, request, reply, callback) {
    if (!this.context.cookie.get('greeting')) {
      this.context.cookie.set('greeting', '1', { expires: 1000 * 60 * 60 * 24 * 365 });
    }

    return reply.redirect('/hello');
  }

  toString(callback) {
    callback(null, 'I am the home page.');
  }

}