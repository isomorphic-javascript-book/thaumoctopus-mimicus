import Call from 'call';

export default class Application {

  constructor(routes, options) {
    this.routes = routes;
    this.options = options;
    this.router = new Call.Router();
    this.registerRoutes(routes);
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.router.add({
        path: path,
        method: 'get'
      });
    }
  }

  navigate(url, push=true) {
    let { history, location } = window;

    if (!history.pushState) {
      window.location = url;
      return;
    }

    let match = this.router.route('get', url);
    let { route: path, params } = match;
    let Controller = this.routes[path];
    if (path && Controller) {
      const controller = new Controller({
        query: location.query,
        params: params
      });

      controller.index(this, {}, {}, (err) => {
        if (err) {
          return reply(err);
        }

        controller.toString((err, html) => {
          if (err) {
            return reply(err);
          }

          document.querySelector(this.options.target).innerHTML = html;
        });
      });

      console.log(url);
      if (push) {
        history.pushState({}, null, url);
      }
    }
  }

  start() {
    this.popStateListener = window.addEventListener('popstate', (e) => {
      console.log('POP');
      console.log(e);
      console.log(window.location.pathname);
      this.navigate(window.location.pathname, false);
    });

    this.clickListener = document.addEventListener('click', (e) => {
      let { target } = e;
      let identifier = target.dataset.navigate;
      let href = target.getAttribute('href');

      if (identifier !== undefined) {
        if (href) {
          e.preventDefault();
        }

        this.navigate(identifier || href);
      }
    });
  }

}