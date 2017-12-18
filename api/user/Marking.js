var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).json(jwt.decode(req.headers['x-access-token']));
});

module.exports = router;
