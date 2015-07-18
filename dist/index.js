'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

// Create a server with a host and port
var server = new _hapi2['default'].Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function handler(request, reply) {
        reply('hello world');
    }
});

// Start the server
server.start();