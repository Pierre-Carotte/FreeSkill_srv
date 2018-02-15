var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var GetMessage = require.main.require(v.pathModule.BDDMessage);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var getMessage = new GetMessage();
    id = jwt.decode(req.headers[v.keyAcessToken]).idUser;
    result = getMessage.getMessageList(id);
    res.status(200).json({success: true, message: result});
    //console.log(list);
});

module.exports = router;
