import Controller from './lib/Controller';

export default class HomeController extends Controller {

  index(application, request, reply, callback) {
    return reply.redirect('/hello');
  }

}