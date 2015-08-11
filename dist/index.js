'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

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

var application = new _lib2['default']({
  // responds to http://localhost:8000/
  '/': function _(request, reply) {
    // read template and compile using context object
    _nunjucks2['default'].render('index.html', getName(request), function (err, html) {
      // reply with HTML response
      reply(html);
    });
  }
}, {
  server: server
});

application.start();