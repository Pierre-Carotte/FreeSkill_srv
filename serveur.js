var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var utils = require('./utils/utilsFunctions');
var app = express();

/**
 * Get port from environment and store in Express.
 */

var port = '443';

/**
 * Create HTTPs server.
 */


var server = https.createServer({
    key: fs.readFileSync('./config/private.key'),
    cert: fs.readFileSync('./config/certificat.crt')
}, app);

server.listen(port);
var serverHttp = http.createServer(app);

serverHttp.listen(80);

app.get("/", function(req, res){
    console.log("test");
    res.send('test');
});

var AuthController = require('./routes/auth');
var userApi = require('./routes/user');
app.use('/auth', AuthController);
app.use('/user', userApi);
