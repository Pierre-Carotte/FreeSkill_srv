var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetTags = (function(){
    var BDDGetTags = function(){
    };

    BDDGetTags.prototype.getTagById = function(id_tag){
        //console.log("BDDGetTags.getTagById");
        var reqTag = connection.call("getTagById", [id_tag]);
        reqTag.pop();
        return reqTag[0];
    }

    BDDGetTags.prototype.getTagByName = function(tag){
        //console.log("BDDGetTags.getTagByName");
        console.log(tag);
        var reqTag = connection.call("getTagByName", [tag]);
        reqTag.pop();
        console.log(reqTag);
        return reqTag[0];
    }

    BDDGetTags.prototype.getTags = function(tags){
        var tagsTab=[];
        //console.log(tags);
        for (id of tags) {
         //   console.log(id);
         //   console.log(id.id_tag);
            tagName = this.getTagById(id.id_tag);
            //console.log(tagName.tag);
        //    console.log(tagName);
            tagsTab.push(tagName.tag);
        }
        return tagsTab;
    }

    BDDGetTags.prototype.getTagsShare = function(id){
        //console.log("BDDGetTags.getTagsShare");
        var reqTag = connection.call("getTagsShare", [id]);
        reqTag.pop();
    //    console.log(reqTag);
        return this.getTags(reqTag);
    }

    BDDGetTags.prototype.getTagsDiscover = function(id){
        console.log("BDDGetTags.getTagsDiscover");
        console.log(id);
        var reqTag = connection.call("getTagsDiscover", [id]);
        reqTag.pop();
        return this.getTags(reqTag);
    }

    BDDGetTags.prototype.getTagShare = function(id,idtag){
        console.log("BDDGetTags.getTagShare");
        var reqTag = connection.call("getTagShare", [id,idtag]);
        reqTag.pop();
        if (reqTag[0] == undefined){
            return null;
        }else{
            return this.getTagById(reqTag[0].tag);
        }
    }

    BDDGetTags.prototype.getTagDiscover = function(id,idtag){
        console.log("BDDGetTags.getTagDiscover");
        var reqTag = connection.call("getTagDiscover", [id,idtag]);
        reqTag.pop();
        if (reqTag[0] == undefined){
            return null;
        }else{
            return this.getTagById(reqTag[0].tag);
        }
    }

    BDDGetTags.prototype.getTagInKey = function(id,tag,key){
        if (key=="tags_share"){
            return this.getTagShare(id,tag);
        } else if (key=="tags_discover"){
            return this.getTagDiscover(id,tag);
        }
    }

    BDDGetTags.prototype.getAllTags = function(){
        console.log("BDDGetTags.getAllTags");
        var reqTag = connection.call("getAllTags", []);
        reqTag.pop();
        return reqTag;
    }

    return BDDGetTags;
})();

module.exports = BDDGetTags;