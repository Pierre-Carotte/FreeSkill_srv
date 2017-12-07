// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    next();
});

var searchProfiles = require('../api/user/searchProfiles');
router.use('/searchProfiles', searchProfiles);

var chatList = require('../api/user/chatList');
router.use('/chatList', chatList);

var getMessages = require('../api/user/getMessages');
router.use('/getMessages', getMessages);

var newMeet = require('../api/user/newMeet');
router.use('/newMeet', newMeet);

var Marking = require('../api/user/Marking');
router.use('/Marking', Marking);

//var GetMark = require('../api/user/GetMark');
//router.use('/GetMark', GetMark);

var GetUserParams = require('../api/user/GetUserParams');
router.use('/GetUserParams', GetUserParams);

var SetUserParams = require('../api/user/SetUserParams');
router.use('/SetUserParams', SetUserParams);


module.exports = router;
