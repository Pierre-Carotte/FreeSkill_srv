var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require('../../utils/webToken');
var GetMessages = require.main.require(v.pathModule.BDDMessage);
var jwt = new WebToken();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var bddMessage = new GetMessages();
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    result = bddMessage.getMessages(decode.idUser);
    res.status(200).json({success: true, message: result});
    //res.status(200).json(jwt.decode(req.headers['x-access-token']));
});

module.exports = router;
