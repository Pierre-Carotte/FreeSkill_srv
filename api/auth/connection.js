var express = require('express');
var sha256 = require('sha256')
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var utils = require.main.require(v.pathModule.utilsFunctions);
var BDDConnection = require.main.require(v.pathModule.BDDConnection);
var router = express.Router();
var dbConnection = new BDDConnection();

router.use(function(req, res, next){
    var test = new utils();
// Test if we have all params
    var verify = test.testParams(req.query, v.parmasRegister);
    if(verify !== true ){
        res.status(200).json({success: false, message: 'error:register ' + verify});
        return false;
    }
//test if email known
    if(!dbConnection.testLogin(req.query.email) || (!test.verifyMail(req.query.email))){
        res.status(200).json({success: false, message: v.messages.invalidMail});
        return false;
    }
    if(!dbConnection.testPassword(req.query.email, sha256(req.query.password))){
        res.status(200).json({success: false, message: v.messages.badPassword});
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
    //next();
});


router.use(function(req, res, next){
    //todo step for logs
    //console.log("log");
});

module.exports = router;
