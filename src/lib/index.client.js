import Call from 'call';
import query from 'query-string';

export default class Application {

  constructor(routes, options) {
    // save off routes as look up table for controllers
    this.routes = routes;
    this.options = options;
    // create a call router instance
    this.router = new Call.Router();
    this.registerRoutes(routes);
  }

  registerRoutes(routes) {
    // loop through routes and add them
    // to the call router instance
    for (let path in routes) {
      this.router.add({
        path: path,
        method: 'get'
      });
    }
  }

  navigate(url, push=true) {
    // if browser does not support the history api
    // then set location and return
    if (!history.pushState) {
      window.location = url;
      return;
    }

    // split the path and search string
    let urlParts = url.split('?');
    // destructure url parts array
    let [path, search] = urlParts;
    // see if url path matches route in router
    let match = this.router.route('get', path);
    // destructure the route path and path path params
    let { route, params } = match;
    // look up controller class in routes table
    let Controller = this.routes[route];
    // if a route was matched and controller class
    // was in the routes table then create a
    // controller instance
    if (route && Controller) {
      const controller = new Controller({
        // parse search string into object
        query: query.parse(search),
        params: params
      });

      // request and reply stubs; facades will be
      // implemented in the next chapter
      const request = () => {};
      const reply = () => {};
      // execute controller action
      controller.index(this, request, reply, (err) => {
        if (err) {
          return reply(err);
        }

        // render controller response
        controller.render(this.options.target, (err, response) => {
          if (err) {
            return reply(err);
          }

          reply(response);
        });
      });

      // only push history stack if push
      // argument is true
      if (push) {
        history.pushState({}, null, url);
      }
    }
  }

  start() {
    // create event listener popstate
    this.popStateListener = window.addEventListener('popstate', (e) => {
      let { pathname, search} = window.location;
      let url = `${pathname}${search}`;
      console.log(url);
      this.navigate(url, false);
    });

    // create click listener that delegates to navigate method
    // if it meets the criteria for executing
    this.clickListener = document.addEventListener('click', (e) => {
      let { target } = e;
      let identifier = target.dataset.navigate;
      let href = target.getAttribute('href');

      if (identifier !== undefined) {
        // if user clicked on an href then prevent
        // the default browser action (loading a new html doc)
        if (href) {
          e.preventDefault();
        }

        // navigate using the identifier if one was defined
        // or the href
        this.navigate(identifier || href);
      }
    });
  }

}