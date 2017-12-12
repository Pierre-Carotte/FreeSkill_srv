var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var GetProfile = require('../../db/user/BDDGetProfile');
var GetTags = require('../../db/user/BDDGetTags');
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

/* GET user profile. */
router.get('/', function(req, res, next) {
    var profile = new GetProfile();
    var tags = new GetTags();
    console.log(jwt.decode(req.headers['x-access-token']));
    userData = profile.getProfile(jwt.decode(req.headers['x-access-token']).email);
    tagShare = tags.getTagsShare(userData[0].id);
    tagDiscover = tags.getTagsDiscover(userData[0].id);
    res.send(formatProfile(userData[0],tagShare,tagDiscover));
    next();
});

function formatProfile(userData,share,discover){
    return {
        profile:{
            "first_name": userData.first_name,
            "description": userData.description,
            "average_mark": userData.average_mark,
            "tags_share": share,
            "tags_discover": discover
        },
        settings:{
            "email": userData.email,
            "last_name": userData.last_name,
            "notif_message": userData.message,
            "notif_reminder": userData.notif_reminder,
            "notif_mark": userData.notif_mark,
            "notif_meeting": userData.notif_meeting,
            "notif_match": userData.notif_match
        }
    }
}

module.exports = router;