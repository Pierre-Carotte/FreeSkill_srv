var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var DelMatch = require.main.require(v.pathModule.BDDDelMatch);

/* GET users listing. */
router.delete('/:id', function(req, res, next) {
    var idUser2 = req.params.id;
    var dm = new DelMatch();
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    if(!isNaN(idUser2)){
        result = dm.delMatch(decode.idUser, idUser2);
        res.status(200).json({success: true, message: ""});
    }else{
        res.status(200).json({success: false, message: "BAD PARAMETER"});
    }
});

module.exports = router;
