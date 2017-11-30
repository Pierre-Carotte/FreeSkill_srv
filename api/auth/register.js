var express = require('express');
var utils = require('../../utils/utilsFunctions');
var router = express.Router();

/*
Middleware to test params in the body:
firstname
name
email
password
gps
 */

var parmasRegister = ['firstname', 'name', 'email', 'password', 'gps'];
router.use((req, res, next) => {
    var test = new utils();
var verify = test.testParams(req.body, parmasRegister);
if(verify !== true){
    res.send('error:register' + verify, 400);
    return false;
}

if(!test.verifyMail(req.body.email)){
    res.send('error: invalid mail', 400);
    return false;
}
//test if email is correct
next();
});

/*
Request register
 */
router.post('/register', function(req, res, next) {
    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("register");
    res.send('register');
});

module.exports = router;