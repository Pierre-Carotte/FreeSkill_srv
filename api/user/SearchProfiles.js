var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();
var GetTags = require('../../db/user/BDDGetTags');
var GetProfile = require('../../db/user/BDDGetProfile');

var DataFake =  [
    {
        idProfil : 1,
        firstname: "Olivier",
        perimeter: 20,
        isAssos: true,
        average_mark: 1,
        description: "salut pauvre con",
        tags_discover: ['Poterie', 'DanseClassique'],
        tags_share: ['Informatique', 'MusiqueElectronique']
    },
    {
        idProfil : 1,
        firstname: "Olivier",
        perimeter: 20,
        isAssos: true,
        average_mark: 1,
        description: "salut pauvre con",
        tags_discover: ['Poterie', 'DanseClassique'],
        tags_share: ['Informatique', 'MusiqueElectronique']
    },
    {
        idProfil : 1,
        firstname: "Olivier",
        perimeter: 20,
        isAssos: true,
        average_mark: 1,
        description: "salut pauvre con",
        tags_discover: ['Poterie', 'DanseClassique'],
        tags_share: ['Informatique', 'MusiqueElectronique']
    },
    {
        idProfil : 1,
        firstname: "Olivier",
        perimeter: 20,
        isAssos: true,
        average_mark: 1,
        description: "salut pauvre con",
        tags_discover: ['Poterie', 'DanseClassique'],
        tags_share: ['Informatique', 'MusiqueElectronique']
    }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    var profile = new GetProfile();
    var tags = new GetTags();
    //console.log(jwt.decode(req.headers['x-access-token']));
    console.log("searchprofiles");
    /*
    var idAsker = jwt.decode(req.headers['x-access-token']).idUser;
    var responseList={};
    var userList = "Requete sofiane idAsker";
    var responseList = makeList(userList);
    res.send(responseList);
    */
    res.status(200).json({success: true, message: DataFake});
});

function makeList(userList) {
    for (user in userList){
        var userData = profile.getUserProfile(user.id);
        var tagShare = tags.getTagsShare(userData[0].id);
        var tagDiscover = tags.getTagsDiscover(userData[0].id);
        responseList.push(formatUserProfile(userData[0],share,discover))
    }
    return responseList;
}

function formatUserProfile(userData,share,discover){
    return {
            "id" : userData.id,
            "first_name": userData.first_name,
            "is_assos": userData.is_assos,
            "average_mark": userData.average_mark,
            "description": userData.description,
            "tags_share": share,
            "tags_discover": discover
    }
}

module.exports = router;
