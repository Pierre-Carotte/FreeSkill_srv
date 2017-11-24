var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/searchProfiles', function(req, res, next) {
    console.log("searchprofiles");
    res.send('serchProfile');
});

module.exports = router;
