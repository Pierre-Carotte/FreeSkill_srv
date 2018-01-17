var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var BDDMeets = require.main.require(v.pathModule.BDDMeets);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var bddMeets = new BDDMeets();
    var decode = jwt.decode(req.headers[v.keyAcessToken]);
    result = bddMeets.getMeets(decode.idUser);
    res.status(200).json({success: true, message: result});
});

module.exports = router;
