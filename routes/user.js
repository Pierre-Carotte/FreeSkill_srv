// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

var searchProfiles = require('../api/user/searchProfiles');
router.use('/', searchProfiles);

module.exports = router;
