// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');
//var config = require('../config');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
console.log(bodyParser.json());
router.use(function (req, res, next) {
    //console.log(req);
   // console.log('Time:', Date.now());
    next();
});

/*router.post('/register', function(req, res) {
    console.log(req.body);
    res.status(200).send({ auth: true, token: "ok" });
});
*/
router.get('/salut', function(req, res) {
    console.log(req.body);
    res.status(200).send("saalut");
});
var connection = require('../api/auth/connection');
router.use('/', connection);

var register = require('../api/auth/register');
router.use('/', register);


module.exports = router;
