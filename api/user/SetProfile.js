var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var GetProfile = require('../../db/user/BDDGetProfile');
var SetProfile = require('../../db/user/BDDSetProfile');
var GetTags = require('../../db/user/BDDGetTags');
var AddNewTagInDB = require('../../db/user/BDDAddTag');
var jwt = new WebToken();

//Will update the DB by merging a sent JSON with the corresponding profile that is stored in the DB.
function mergeProfile(req,userData){

    var profileSetter = new SetProfile();
    var tagGetter = new GetTags();
    var tagAdder = new AddNewTagInDB();

    for (key in req) {
        if (req[key]!=userData[key]){
            //If the the Key is a tag Share or a tag Discover,
            if (key == "tags_share" || key == "tags_discover"){
                //!\\ tags_share and tags_discover are differenciated by the variable key //!\\
                console.log("The "+key+" table will we updated according to this tab: ");
                tagsToEdit = tagsEditor(req[key],userData[key]);
                for (tag in tagsToEdit){
                    if ((parseInt(tag)%2)==0){
                        if (tagsToEdit[parseInt(tag)+1]=="ADD"){
                            //Need to add the tag
                            //Check if tag is in DB
                            tagIsInTagsTable = tagGetter.getTagByName(tagsToEdit[tag].toUpperCase());
                            if (tagIsInTagsTable == undefined){
                                //if not add it
                                tagAdder.addNewTagInDB(tagsToEdit[tag]);
                                //And get its new ID
                                concernedTag = tagGetter.getTagByName(tagsToEdit[tag]);
                                //Add the tag in the table:
                                profileSetter.setTag(userData.id,key,concernedTag.id,"ADD");
                            }else{
                                concernedTag = tagGetter.getTagInKey(userData.id,tagIsInTagsTable.id,key);
                                //Add the tag in tag_key:
                                if (concernedTag == undefined) {
                                    profileSetter.setTag(userData.id, key, tagIsInTagsTable.id, "ADD");
                                } else {
                                    console.log("Tag "+ concernedTag.tag + " already found in table tags");
                                }
                            }
                        }else if (tagsToEdit[parseInt(tag)+1]=="DEL"){
                            //Delete a tag
                            tagToEdit = tagGetter.getTagByName(tagsToEdit[tag]);
                            profileSetter.setTag(userData.id,key,tagToEdit.id,"DEL");
                        }
                    }
                }
            } else {
                //Update the user profile's concerned column
                profileSetter.setProfile(userData.email,key,req[key]);
                console.log("USER "+ userData.id +"UPDATED " + key + " FROM " + userData[key] + " TO " + req[key]);
            }
        }
    }
}

//tagsEditior returns a Tab like: [{ id='12', tag='fooTag'},1,{ id='12', tag='fooTag'},-1,...]
//fooTag is followed by 1 that means it has to be added in tagshare or tagdiscover.
//fooTag is followed by -1 that means it has to be deleted in tagshare or tagdiscover.
function tagsEditor(req,userData){
    var tagsToEdit=[];

    //First, analyse the request.
    //console.log("REQ");
    for (var tagreq in req){
        //console.log(req[tagreq]);
        tagDestiny = parseInt(findTag(req[tagreq],userData)^(1));
        if (tagDestiny!=0){
            tagsToEdit.push(req[tagreq]);
            tagsToEdit.push(genADDorDEL(tagDestiny));
        }
    }
    //Then, analyse the user tags
    //console.log("PROF");
    for (var taguserData in userData){
        tagDestiny = parseInt(findTag(userData[taguserData],req))-1;
        if (tagDestiny!=0){
            tagsToEdit.push(userData[taguserData]);
            tagsToEdit.push(genADDorDEL(tagDestiny));
        }
    }

    console.log(tagsToEdit);
    return tagsToEdit;
}

function genADDorDEL (destiny){
    if (destiny==1){
        return "ADD"
    }else if (destiny==-1){
        return "DEL"
    }
}

//Checks if a tag written in JSON is present in a JSON object.
function findTag(tag,object){
    found = 0;
    //console.log("TOFIND: "+tag )
    for (var element in object) {
        //console.log("object element: "+object[element]);
        //Check by upperCasing the tags names.
        if (tag.toUpperCase() == object[element].toUpperCase()){
           found = 1;
        }
    }
    return parseInt(found);
}

router.put('/', function(req, res, next) {
    var profile = new GetProfile();
    var tags = new GetTags();
    console.log(jwt.decode(req.headers['x-access-token']));
    userData = profile.getPersonalProfile(jwt.decode(req.headers['x-access-token']).email);
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