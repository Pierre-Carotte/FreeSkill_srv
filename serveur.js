var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var app = express();

/**
 * Get port from environment and store in Express.
 */

var port = '443';

console.log(https);
/**
 * Create HTTPs server.
 */


var server = https.createServer({
    key: fs.readFileSync('./config/rsa/private.key'),
    cert: fs.readFileSync('./config/rsa/certificat.crt')
}, app);

//server.listen(port);
//var server = http.createServer(app);

server.listen(port);

app.get('/test', function(req, res){
    console.log("test");
    res.send('test');
});

var AuthController = require('./routes/auth');
var userApi = require('./routes/user');
app.use('/auth', AuthController);
app.use('/user', userApi);
