var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();
var GetTags = require('../../db/user/BDDGetTags');
var GetProfile = require('../../db/user/BDDGetProfile');
var SearchProfile = require('../../db/user/BDDSearchProfile');

var DataFake =  [
    {
        idProfil : 1,
        firstname: "Florian",
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
        firstname: "Florian",
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
    /*
    var idAsker = jwt.decode(req.headers['x-access-token']).idUser;
    var responseList={};
    var userList = "Requete sofiane idAsker";
    var responseList = makeList(userList);
    res.send(responseList);
    */
    var idList = [];
    var bdSearch = new SearchProfile();
    var result = bdSearch.searchProfile(3);
    /* for(let element of result){
        if(element.id_user != undefined){
            console.log(element.id_user);
            idList.push(element.id_user);
        }
    } */
    var result2 = bdSearch.searchProfileStep2(3);
    var result3 = bdSearch.searchProfileStep3(3);
    // console.log(result.concat(result2).concat(result3));
    /* var profile = new GetProfile();
     console.log(profile.getUserProfile(3));*/
    console.log(result.concat(result2).concat(result3));
    var profiles = makeList(result.concat(result2).concat(result3));
    res.status(200).json({success: true, message:  makeList(result.concat(result2).concat(result3))});
});

function makeList(userList) {
    var profile = new GetProfile();
    var tags = new GetTags();
    var responseList =[];
    //console.log(userList);
    for (let id of userList){
        var userData = profile.getUserProfile(id);
        var tagShare = tags.getTagsShare(id);
        var tagDiscover = tags.getTagsDiscover(id);
       responseList.push(formatUserProfile(userData,tagShare,tagDiscover));
    }
    return responseList;
}

/*
{
    idProfil : 1,
    firstname: "Florian",
    perimeter: 20,
    isAssos: true,
    average_mark: 1,
    description: "salut pauvre con",
    tags_discover: ['Poterie', 'DanseClassique'],
    tags_share: ['Informatique', 'MusiqueElectronique']
}*/
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
