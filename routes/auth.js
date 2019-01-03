var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var register = require('../api/auth/register');
router.use('/register', register);

var connection = require('../api/auth/connection');
router.use('/connection', connection);

module.exports = router;
