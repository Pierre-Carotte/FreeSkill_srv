var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var connection = require('../api/auth/connection');
router.use('/', connection);

var register = require('../api/auth/register');
router.use('/', register);

module.exports = router;
