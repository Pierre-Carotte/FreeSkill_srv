var express = require('express');
var WebToken = require('../../utils/webToken');
var utils = require('../../utils/utilsFunctions');
var router = express.Router();

//var parmasRegister = ['email', 'password', 'gps'];
var parmasRegister = ['email', 'password'];
router.use((req, res, next) => {
    var test = new utils();
    console.log(req.query);
var verify = test.testParams(req.query, parmasRegister);
if(verify !== true){
    res.send('error:register' + verify, 400);
    return false;
}

if(!test.verifyMail(req.query.email)){
    res.send('error: invalid mail', 400);
    return false;
}
//test if email is correct
next();
});


/* GET users listing. */
router.get('/connection', function(req, res, next) {
    var jwt = new WebToken();
    //res.send(jwt.createToken("dsfsdf"));
    console.log(jwt.createToken("dsfsdf"));
    res.json({success: true, message: jwt.createToken("dsfsdf")});
});

module.exports = router;
