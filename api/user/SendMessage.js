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
    console.log("send message");
    var setMessage = new SetMessage();
    var getMatch = new GetMatch();
    id_user1 = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    id_user2 = req.body.interlocutor;
    console.log(req.query);
    console.log(req.body);
    console.log("send message2");
    if (getMatch.getIdMatch(id_user1,id_user2)==undefined) {
        console.log("send message3");
        res.status(200).json({success: false, message: v.messages.noMatchs});
    } else {
        console.log("send message4");
        setMessage.setMessage(jwt.decode(req.headers[v.keyAcessToken]).idUser, id_user2,req.body.message);
        /*retour =  setMessage.getLastMessage(id_user1,id_user2);
        res.status(200).json({success: true, message: retour});*/
        res.status(200).json({success: true, message: req.body.message});
    }

});

module.exports = router;