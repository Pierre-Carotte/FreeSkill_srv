var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var SetMessage = require.main.require(v.pathModule.BDDMessage);
var GetMatch = require.main.require(v.pathModule.BDDGetMatch);

/* create new message
* parameter type query:
*   interlocutor: id user 2
*   message : type string
* */

router.put('/', function(req, res, next) {
    var setMessage = new SetMessage();
    var getMatch = new GetMatch();
    id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    id_user2 = req.query.interlocutor;
    if (getMatch.getIdMatch(id_user1,id_user2)==undefined) {
        res.status(200).json({success: false, message: v.messages.noMatchs});
    } else {
        setMessage.setMessage(jwt.decode(req.headers[v.keyAcessToken]).idUser, id_user2,req.query.message);
        retour =  setMessage.getLastMessage(id_user1,id_user2);
        res.status(200).json({success: true, message: retour});
    }

});

module.exports = router;