var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables')
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var SetMark = require.main.require(v.pathModule.BDDSetMark);
var GetMeet = require.main.require(v.pathModule.BDDGetMeet);

/* GET users listing. */
router.put('/', function(req, res, next) {

    var setMark = new SetMark();
    var getMeet = new GetMeet();
    var id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    var id_user2 = req.query.interlocutor;
    var mark = req.query.mark;
    var message = req.query.message;
    var markableMeet = getMeet.getMarkableMeet(id_user1,id_user2);

    if (markableMeet.length == 0) {
        res.status(200).json({success: false, message: v.messages.noMeet});
    } else {
        console.log(markableMeet);
        setMark.setMark(jwt.decode(req.headers[v.keyAcessToken]).idUser, id_user2,mark,markableMeet[0].tag_discover,message);
        res.status(200).json({success: true, message: v.messages.markSent});
    }
});

module.exports = router;
