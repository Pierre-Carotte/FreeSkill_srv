var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables')
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var SetIDFCM = require.main.require(v.pathModule.BDDSetIDFCM);

/* TODO : changer PUT  serveur et app; msg is read. */
router.put('/', function(req, res, next) {
    var setIDFCM = new SetIDFCM();
    var id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    var id_fcm = req.query.fcm;
    var fcmOk = setIDFCM.updateFCM(id_user1,id_fcm);

    res.status(200).json({success: true, message: "fcm ok"});
});

module.exports = router;