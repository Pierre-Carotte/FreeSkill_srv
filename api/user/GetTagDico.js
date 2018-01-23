var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require.main.require(v.pathModule.webToken);
var jwt = new WebToken();
var GetTags = require.main.require(v.pathModule.BDDGetTags);

/* GET tags dictionary. */

router.get('/', function(req, res, next) {
    var getTags = new GetTags();
    var list = getTags.getAllTags();
    var formatedList = formatList(list);
    if (formatList==undefined) {
        res.status(200).json({success: false, message: 'error: failed retreiving tags'});
    } else {
        res.status(200).json({success: true, message: 'success: see value'});
        res.send(formatedList);
    }
    //console.log(list);
});

function formatList(list){
    var newList=[];
    for (tag of list) {
        newList.push(tag.tag);
    }
    console.log(newList);
    return newList;
}

module.exports = router;