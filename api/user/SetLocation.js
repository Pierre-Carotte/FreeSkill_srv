var express = require('express');
var fs = require('fs');
var router = express.Router();
var utils = require('../../utils/utilsFunctions');
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var BDDLocation = require.main.require(v.pathModule.BDDLocation);
var jwt = new WebToken();


var parmasRegister = ['lat', 'lon'];
router.use((req, res, next) => {
    var test = new utils();
    var verify = test.testParams(req.body, parmasRegister);
    if(verify !== true){
        res.status.send('error:register' + verify);
        return false;
    }
    next();
});

router.post('/', function(req, res){
    var latitude = parseFloat(req.body.lat);
    var longitude = parseFloat(req.body.lon);
    if(isNaN(latitude) || isNaN(longitude)){
        res.json({success: false, message: "BAD PARAMETERS: is not a float"});
    }else{
        var decode = jwt.decode(req.headers[v.keyAcessToken]);
        var location = new BDDLocation();
        location.updateLocation(decode.idUser, latitude, longitude);
        res.json({success: true, message: ""});
    }
});

module.exports = router;