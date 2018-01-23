var express = require('express');
var utils = require('../../utils/utilsFunctions');
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var BDDRegister = require.main.require(v.pathModule.BDDRegister);
var router = express.Router();

/*
Middleware to test params in the body:
firstname
name
email
password
gps
 */

var parmasRegister = ['firstname', 'name', 'email', 'password' /*, 'gps'*/];
router.use((req, res, next) => {
    console.log("register");
    var test = new utils();
    var verify = test.testParams(req.body, parmasRegister);
    if(verify !== true){
        res.status.send('error:register' + verify);
        return false;
    }

    if(!test.verifyMail(req.body.email)){
        res.status(200).json({success: false, message:'error: invalid mail'});
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
    var register = new BDDRegister();
    res.status(200).json({success: true,
                                message: register.register(req.body.firstname, req.body.name, req.body.email, req.body.password)});
});

module.exports = router;