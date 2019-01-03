var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);

var admin = require("firebase-admin");

var serviceAccount = require("../../config/serviceaccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://freeskill-e501c.firebaseio.com"
});

var registrationToken = "dJXBioBTjjo:APA91bFMQ_-vUKcgmXlE3ABs6XtXIvng3m4XA4_jdjNlNAJiuRP_j96NjD3RwrtTqHgTTJOfoQuQBsGSi30CmuFO7S5HQXjlREqKfgaHSFV1peuGjOpIFUSSoqlK4Qu7y83ErsmEO8Oz";

// This registration token comes from the client FCM SDKs.

// See documentation on defining a message payload.
var message = {
    notification: {
        title: '$GOOG up 1.43% on the day',
        body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken
};

var jwt = new WebToken();


router.put('/', function(req, res, next) {
    var setJudgement = new SetJudgement();

    // Send a message to the device corresponding to the provided
// registration token.
    admin.messaging().send(message)
            .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
    })
    .catch((error) => {
            console.log('Error sending message:', error);
    });
    var match = setJudgement.setJudgement(jwt.decode(req.headers[v.keyAcessToken]).idUser,req.query.judged,req.query.meet);
    if (match == "MATCH") {
        res.status(200).json({success: true, message: 'judgement done', match: 1});
    } else {
        res.status(200).json({success: true, message: 'judgement done', match: 0});
    }
});

module.exports = router;