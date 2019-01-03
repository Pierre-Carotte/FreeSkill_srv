var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var GetProfile = require.main.require(v.pathModule.BDDGetProfile);
var GetTags = require.main.require(v.pathModule.BDDGetTags);
/* GET profile user. */
/* GET user profile. */

/*var admin = require("firebase-admin");

var serviceAccount = require("../../config/serviceaccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://freeskill-e501c.firebaseio.com"
});

var registrationToken = "40b0caa";

// This registration token comes from the client FCM SDKs.

// See documentation on defining a message payload.
var message = {
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken
};*/




router.get('/', function(req, res, next) {
    console.log("GetProfile");
    var profile = new GetProfile();
    var tags = new GetTags();
    console.log(jwt.decode(req.headers[v.keyAcessToken]));
    console.log(jwt.decode(req.headers[v.keyAcessToken]).email);
    userData = profile.getPersonalProfile(jwt.decode(req.headers[v.keyAcessToken]).email);
    tagShare = tags.getTagsShare(userData[0].id);
    tagDiscover = tags.getTagsDiscover(userData[0].id);
    //res.send(formatProfilePerso(userData[0],tagShare,tagDiscover));
// Send a message to the device corresponding to the provided
// registration token.
/*    admin.messaging().send(message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
})
.catch((error) => {
        console.log('Error sending message:', error);
});*/
    res.status(200).json({success: true, message:  formatProfilePerso(userData[0],tagShare,tagDiscover)});

    next();
});

function formatProfilePerso(userData,share,discover){
    return {
        profile:{
            "first_name": userData.first_name,
            "last_name": userData.last_name,
            "email": userData.email,
            "description": userData.description,
            "average_mark": userData.average_mark,
            "tags_share": share,
            "tags_discover": discover
        },
        settings:{
            "perimeter": userData.perimeter,
            "notif_message": userData.notif_message,
            "notif_reminder": userData.notif_reminder,
            "notif_mark": userData.notif_mark,
            "notif_meeting": userData.notif_meeting,
            "notif_match": userData.notif_match
        }
    }
}
module.exports = router;
