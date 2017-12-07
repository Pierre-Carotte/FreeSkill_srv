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
    console.log("register test");
    var test = new utils();
    var verify = test.testParams(req.body, parmasRegister);
    if(verify !== true){
        res.status.send('error:register' + verify);
        return false;
    }

    if(!test.verifyMail(req.body.email)){
        res.status(400).send('error: invalid mail');
        return false;
    }
    //test if email is correct
    next();
});

/*
Request register
 */
router.post('/', function(req, res, next) {
    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("register");
    res.status(200).send('register');
});

module.exports = router;