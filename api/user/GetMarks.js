var express = require('express');
var fs = require('fs');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var BDDGetMark = require.main.require(v.pathModule.BDDGetMark);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);
var jwt = new WebToken();

/* GET users listing. */

router.get('/', function(req, res, next){
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    var mark = new BDDGetMark();
    var setJudge = new SetJudgement()
    result = mark.getMarks(decode.idUser);

    res.status(200).json({success: true, message: result});
    //next();
});

router.get('/:id', function(req, res, next){
    var idUser2 = req.params.id;
    var mark = new BDDGetMark();
    var setJudge = new SetJudgement();
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    if(!isNaN(idUser2) && setJudge.isAuthorise(decode.idUser, idUser2)){
        result = mark.getMarks(idUser2);
        res.status(200).json({success: true, message: result});
    }else{
        res.status(200).json({success: false, message: "No marks"});
    }

});

module.exports = router;