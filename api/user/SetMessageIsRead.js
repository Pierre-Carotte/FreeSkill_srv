var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables')
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var SetIsRead = require.main.require(v.pathModule.BDDMessage);

/* PUT msg is read. */
router.put('/', function(req, res, next) {

    var setIsRead = new SetIsRead();
    var id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    var id_user2 = req.query.interlocutor;
    var id_msg = req.query.idmsg;
    var read = setIsRead.updateIsRead(id_user1,id_user2,id_msg);

    res.status(200).json({success: true, message: "is read ok"});
});

module.exports = router;