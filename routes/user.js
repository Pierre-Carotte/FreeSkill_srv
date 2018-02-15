// AuthController.js
var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');

var WebToken = require('../utils/webToken');
var jwt = new WebToken();
router.use((req, res, next) => {
    var token = req.headers['x-access-token'];
    if(token == undefined){
        res.status(200).json({success: false, message: 'error: Missing token'});
    }
    try{
        jwt.verify(token)
       // console.log(jwt.verify(token));
    }catch(err) {
        res.status(200).json({success: false, message: 'error: bad token'});
    }
    next();
});

router.use(fileUpload());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

var SearchProfiles = require('../api/user/SearchProfiles');
router.use('/searchProfiles', SearchProfiles);

var GetMessages = require('../api/user/GetMessages');
router.use('/GetMessages', GetMessages);

var GetMatches = require('../api/user/GetMatches');
router.use('/GetMatches', GetMatches);

var SendMessage = require('../api/user/SendMessage');
router.use('/SendMessage', SendMessage);

var SetProfile = require('../api/user/SetProfile');
router.use('/SetProfile', SetProfile);

var SetJudgement = require('../api/user/SetJudgement');
router.use('/SetJudgement', SetJudgement);

var GetProfile = require('../api/user/GetProfile');
router.use('/GetProfile', GetProfile);

var GetImage = require('../api/user/GetImage');
router.use('/GetImage', GetImage);

var GetMeets = require('../api/user/GetMeets');
router.use('/GetMeets', GetMeets);

var GetMarks = require('../api/user/GetMarks');
router.use('/GetMarks', GetMarks);

var SetMeet = require('../api/user/SetMeet');
router.use('/SetMeet', SetMeet);

var SetMark = require('../api/user/SetMark');
router.use('/SetMark', SetMark);

var SetMessageIsRead = require('../api/user/SetMessageIsRead');
router.use('/SetMessageIsRead', SetMessageIsRead);

var GetTagDico = require('../api/user/GetTagDico');
router.use('/GetTagDico', GetTagDico);

var SetLocation = require('../api/user/SetLocation');
router.use('/SetLocation', SetLocation);

var GetLocation = require('../api/user/GetLocation');
router.use('/GetLocation', GetLocation);

var DelMatch = require('../api/user/DelMatch');
router.use('/DelMatch', DelMatch);

var SetImage = require('../api/user/SetImage');
router.use('/SetImage', SetImage);

module.exports = router;