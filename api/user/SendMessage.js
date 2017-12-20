var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();
var SetMessage = require('../../db/user/BDDMessage');
var GetMatch = require('../../db/user/BDDGetMatch');

/* GET users listing. */
router.put('/', function(req, res, next) {
    var setMessage = new SetMessage();
    var getMatch = new GetMatch();
    id_user1 = jwt.decode(req.headers['x-access-token']).idUser;
    id_user2 = req.query.interlocutor;
    if (getMatch.getMatch(id_user1,id_user2)==undefined) {
        res.status(200).json({success: false, message: 'error: no match in matches'});
    } else {
        setMessage.setMessage(jwt.decode(req.headers['x-access-token']).idUser,req.query.receiver,req.query.message);
        res.status(200).json({success: true, message: 'message has been sent'});
    }
});

module.exports = router;