var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/connection', function(req, res, next) {
    res.send('connection');
});

module.exports = router;
