var express = require('express');
var fs = require('fs');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);
var jwt = new WebToken();

/* GET users listing. */

router.get('/', function(req, res, next){
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    var path = v.pathImg + decode.idUser+ v.imgExtension;
    if(fs.existsSync(path)){
        res.status(200).download(path);
    }else{
        res.status(200).download(v.pathDefautImg);
    }
    //next();
});

router.get('/:id', function(req, res, next){
    var idUser2 = req.params.id;
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    var setJudge = new SetJudgement();
    path = v.pathImg + idUser2 + v.imgExtension;
    if(!isNaN(idUser2) && setJudge.isAuthorise(decode.idUser, idUser2) && fs.existsSync(path)){
        res.status(200).download(path);
    }else{
        res.status(200).download(v.pathDefautImg);
    }
    console.log("getImage " + decode.idUser + " " + idUser2)
});

module.exports = router;