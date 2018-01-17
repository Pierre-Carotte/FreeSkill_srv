var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var GetTags = require.main.require(v.pathModule.BDDGetTags);
var GetProfile = require.main.require(v.pathModule.BDDGetProfile);
var SearchProfile = require.main.require(v.pathModule.BDDSearchProfile);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var profile = new GetProfile();
    var tags = new GetTags();
    var bdSearch = new SearchProfile();
    var setJudgement = new SetJudgement();
    var idUser = jwt.decode(req.headers[v.keyAcessToken]).idUser
    var result= [];
    result.concat(bdSearch.searchProfile(idUser));
    if(result.length < 15){
        let resultDB = bdSearch.searchProfileStep2(idUser);
        result = result.concat(resultDB);
    }
    if(result.length < 15){
        let resultDB = bdSearch.searchProfileStep3(idUser);
        console.log(resultDB);
        result = result.concat(resultDB);
        console.log(result);
    }

    for(idJudged of result){
        setJudgement.createJudgement(idUser, idJudged);
    }

    var profiles = makeList(result);
    res.status(200).json({success: true, message:  profiles});
});

function makeList(userList) {
    var profile = new GetProfile();
    var tags = new GetTags();
    var responseList =[];
    for (let id of userList){
        var userData = profile.getUserProfile(id);
        var tagShare = tags.getTagsShare(id);
        var tagDiscover = tags.getTagsDiscover(id);
        responseList.push(formatUserProfile(userData,tagShare,tagDiscover));
    }
    return responseList;
}

function formatUserProfile(userData,share,discover){
    return {
        "id" : userData.id,
        "first_name": userData.first_name,
        "perimeter": 20,
        "is_assos": userData.is_assos,
        "average_mark": userData.average_mark,
        "description": userData.description,
        "tags_share": share,
        "tags_discover": discover
    }
}

module.exports = router;
