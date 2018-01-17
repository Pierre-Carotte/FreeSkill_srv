// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var WebToken = require('../utils/webToken');
var jwt = new WebToken();
router.use((req, res, next) => {
    var token = req.headers['x-access-token'];
if(token == undefined){
    res.status(200).json({success: false, message: 'error: Missing token'});
}
try{
    console.log(jwt.verify(token));
}catch(err) {
    res.status(200).json({success: false, message: 'error: bad token'});
}
next();
});


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

var SearchProfiles = require('../api/user/SearchProfiles');
router.use('/searchProfiles', SearchProfiles);

var GetMessages = require('../api/user/GetMessages');
router.use('/GetMessages', GetMessages);

var SendMessage = require('../api/user/SendMessage');
router.use('/SendMessage', SendMessage);

var SetProfile = require('../api/user/SetProfile');
router.use('/SetProfile', SetProfile);

var GetProfile = require('../api/user/GetProfile');
router.use('/GetProfile', GetProfile);

var GetImage = require('../api/user/GetImage');
router.use('/GetImage', GetImage);

var GetMeets = require('../api/user/GetMeets');
router.use('/GetMeets', GetMeets);

module.exports = router;