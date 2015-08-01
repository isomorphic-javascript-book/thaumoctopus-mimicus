'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

// configure nunjucks to read from the dist directory
_nunjucks2['default'].configure('./dist');

// create a server with a host and port
var server = new _hapi2['default'].Server();
server.connection({
  host: 'localhost',
  port: 8000
});

function getName(request) {
  // default values
  var name = {
    fname: 'Rick',
    lname: 'Sanchez'
  };
  // split path params
  var nameParts = request.params.name ? request.params.name.split('/') : [];

  // order of precedence
  // 1. path param
  // 2. query param
  // 3. default value
  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;

  return name;
}

// add the route
server.route({
  method: 'GET',
  path: '/hello/{name*}',
  handler: function handler(request, reply) {
    // read template and compile using context object
    _nunjucks2['default'].render('index.html', getName(request), function (err, html) {
      // reply with HTML response
      reply(html);
    });
  }
});

// start the server
server.start();