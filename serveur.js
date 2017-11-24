var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = express();
var AuthController = require('./routes/auth');
var userApi = require('./routes/user');
app.use('/auth', AuthController);
app.use('/user', userApi);
module.exports = app;

/**
 * Get port from environment and store in Express.
 */

var port = '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server.listen(port);
