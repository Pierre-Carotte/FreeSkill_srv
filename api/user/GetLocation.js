var express = require('express');
var fs = require('fs');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var BDDLocation = require.main.require(v.pathModule.BDDLocation);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);
var jwt = new WebToken();

/* GET users location. */

router.get('/:id', function(req, res, next){
    var idUser2 = req.params.id;
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    var setJudge = new SetJudgement()
    var location = new BDDLocation();
    if(!isNaN(idUser2) && setJudge.isAuthorise(decode.idUser, idUser2)){
            console.log("GetLocation " + decode.idUser + ", " + idUser2);
            res.status(200).json({success: true, message: location.getLocation(decode.idUser,idUser2)});
    }else{
        res.status(200).json({success: false, message: "No authorize"});
    }
});

module.exports = router;