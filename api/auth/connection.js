var express = require('express');
var sha256 = require('sha256')
var WebToken = require('../../utils/webToken');
var utils = require('../../utils/utilsFunctions');
var BDDConnection = require('../../db/auth/BDDConnection');
var router = express.Router();
var dbConnection = new BDDConnection();


//var parmasRegister = ['email', 'password', 'gps'];
var parmasRegister = ['email', 'password'];
router.use(function(req, res, next){
    var test = new utils();
// Test si on a tous les params
    var verify = test.testParams(req.query, parmasRegister);
    if(verify !== true ){
        res.status(200).json({success: false, message: 'error:register' + verify});
        return false;
    }
//test if email known
    if(!dbConnection.testLogin(req.query.email) || (!test.verifyMail(req.query.email))){
        res.status(200).json({success: false, message: 'error: invalid mail'});
        return false;
    }

    if(!dbConnection.testPassword(req.query.email, sha256(req.query.password))){
        res.status(200).json({success: false, message: 'error: bad password'});
    }
    dbConnection.testPassword(req.query.email, sha256(req.query.password));
    next();
});


/* GET acces token */
router.get('/', function(req, res, next) {
    userID = dbConnection.getUserID(req.query.email);
    var jwt = new WebToken();
    var token = jwt.createToken({ idUser: userID, email: req.query.email});
    res.json({success: true, message: token});
    next();
});

router.use(function(req, res, next){
    console.log("log");
});

module.exports = router;
