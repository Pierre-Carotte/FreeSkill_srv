var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var GetTags = require.main.require(v.pathModule.BDDGetTags);
var GetProfile = require.main.require(v.pathModule.BDDGetProfile);
var SearchProfile = require.main.require(v.pathModule.BDDSearchProfile);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);
var Location = require.main.require(v.pathModule.BDDLocation);


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("SearchProfiles");
    var profile = new GetProfile();
    var tags = new GetTags();
    var bdSearch = new SearchProfile();
    var setJudgement = new SetJudgement();
    var idUser = jwt.decode(req.headers[v.keyAcessToken]).idUser
    var result= [];
    result = result.concat(bdSearch.searchProfile(idUser));
    if(result.length < 15){
        let resultDB = bdSearch.searchProfileStep2(idUser);
        result = result.concat(resultDB);
    }

    if(result.length < 15){
        let resultDB = bdSearch.searchProfileStep3(idUser);
        result = result.concat(resultDB);

    }
    for(idJudged of result){
        setJudgement.createJudgement(idUser, idJudged);
    }

    //remove doublons
    var result2 = [];
    result.filter(function(elem,index,array){
        console.log(result2.indexOf(elem));
        if(result2.indexOf(elem) === -1){
            result2.push(elem);
            //console.log(result.indexOf(elem));
        }
        return elem;
    });

    var profiles = makeList(idUser, result2);

    console.log(result2);
    res.status(200).json({success: true, message:  profiles});
    //res.status(200).json({success: true, message:  "test"});
});

function makeList(idUser, userList) {
    var profile = new GetProfile();
    var tags = new GetTags();
    var l = new Location();
    var responseList =[];
    for (let id of userList){
        var userData = profile.getUserProfile(id);
        var tagShare = tags.getTagsShare(id);
        var distance = l.getLocation(idUser, id);
        var tagDiscover = tags.getTagsDiscover(id);
        responseList.push(formatUserProfile(userData, distance, tagShare,tagDiscover));
    }

    return responseList;
}

function formatUserProfile(userData, distance,share,discover){
    return {
        "id" : userData.id,
        "first_name": userData.first_name,
        "distance": distance,
        "is_assos": userData.is_assos,
        "average_mark": userData.average_mark,
        "description": userData.description,
        "tags_share": share,
        "tags_discover": discover
    }
}

module.exports = router;
