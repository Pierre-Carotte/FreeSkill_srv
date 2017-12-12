var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var GetProfile = require('../../db/user/BDDGetProfile');
var SetProfile = require('../../db/user/BDDSetProfile');
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

function mergeProfile(req,userData){
    console.log("Requete profil: "+ req);
    console.log("profil: "+ userData);
    var profileSetter = new SetProfile();
    for (key in req) {
        if (req[key]!=userData[key]){
            if (key == "tags_share" || key == "tags_discover"){
                for (tag in req[key]){
                    console.log(req[key][tag]);
                    if (JSON.stringify(req[key][tag]) == JSON.stringify(userData[key][tag])){
                        console.log("tag égal " + req[key][tag]);
                    } else {
                        console.log("tag inégal" + req[key][tag] +" "+ userData[key][tag]);
                    }
                }
                if (JSON.stringify(req[key]) === JSON.stringify(userData[key])) {
                    console.log("egalité parfaite entre les tags");
                } else {
                    console.log("un tag a changé, mais la requête n'est pas écrite");
                }
            } else {
                console.log("Vous avez changé le champ " + key + " " + req[key] + " ///// " + userData[key]);
                profileSetter.setProfile(userData.email,key,req[key]);
                //UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
            }
        }
    }
}

router.put('/', function(req, res, next) {
    var profile = new GetProfile();
    var tags = new GetTags();
    console.log(jwt.decode(req.headers['x-access-token']));
    userData = profile.getProfile(jwt.decode(req.headers['x-access-token']).email);
    tagShare = tags.getTagsShare(userData[0].id);
    tagDiscover = tags.getTagsDiscover(userData[0].id);
    userData[0]["tags_share"] = tagShare;
    userData[0]["tags_discover"] = tagDiscover;
    console.log(userData[0]);
    mergeProfile(JSON.parse(req.query.profileUpdate),userData[0]);
    //UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
    res.send("hello you want to set a profile");
});

module.exports = router;