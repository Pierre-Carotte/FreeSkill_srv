var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var utils = require('./utils/utilsFunctions');
var forceSSL = require('express-force-ssl');//redirection to https if http
var app = express();



//app.use(secure);
//for lets encrypt
/*
app.use(express.static('static'));*/

/**
 * Get port from environment and store in Express.
 */

var port = '443';

/**
 * Create HTTPs server.
 */

var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/freeskill.ddns.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/freeskill.ddns.net/cert.pem')
}, app);

app.use(forceSSL);

server.listen(port);

var serverHttp = http.createServer(app);

serverHttp.listen(80);

var queryDB = require('./db/queryDB');
app.get("/", function(req, res){
//sql = "SELECT pwd FROM freeskill.users WHERE email = 'sofiane.atrari@isen.yncrea.fr';";
//result = queryDB(sql);
    //console.log(require.main);
    //console.log(__filename);
    res.status(200).send("NODE_PATH");
});


var AuthController = require('./routes/auth');
app.use('/auth', AuthController);
var userApi = require('./routes/user');
app.use('/user', userApi);

