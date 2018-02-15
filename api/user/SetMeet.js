var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables')
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var SetMeet = require.main.require(v.pathModule.BDDSetMeet);
var GetMatch = require.main.require(v.pathModule.BDDGetMatch);

/* PUT a or modify a meet. */
router.put('/', function(req, res, next) {

    var setMeet = new SetMeet();
    var getMatch = new GetMatch();
    var id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    var id_user2 = req.query.interlocutor;
    var meet = req.query.meetdata;


    var matched = getMatch.getIdMatch(id_user1,id_user2);

    if (matched.length == 0) {
        res.status(200).json({success: false, message: v.messages.noMatch});
    } else {
        setMeet.setMeet(id_user1,id_user2,meet);
        res.status(200).json({success: true, message: v.messages.meetSent});
    }
});

module.exports = router;
