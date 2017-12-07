var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();
router.use((req, res, next) => {
    var token = req.headers['x-access-token'];
if(token == undefined){
    res.status(200).json({success: false, message: 'error: Missing token'});
}
try{
    console.log(jwt.verify(token));
}catch(err) {
    res.status(200).json({success: false, message: 'error: bad token'});
}
next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).json(jwt.decode(req.headers['x-access-token']));
});

module.exports = router;
