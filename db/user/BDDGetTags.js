var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetTags = (function(){
    var BDDGetTags = function(){
    };

    BDDGetTags.prototype.getTagById = function(id_tag){
        var sql = "SELECT * FROM freeskill.tags WHERE id = '"+ id_tag +"';";
        var reqTag = queryDB(sql);
        return reqTag[0];
    }

    BDDGetTags.prototype.getTagByName = function(tag){
        var sql = "SELECT id,UPPER(tag) as tag FROM freeskill.tags WHERE UPPER(tag) = '"+ tag +"';";
        var reqTag = queryDB(sql);
        return reqTag[0];
    }

    BDDGetTags.prototype.getTags = function(tags){
        var tagsTab=[];
        for (id of tags) {
            tagName = this.getTagById(id.id_tag);
            tagsTab.push(tagName.tag);
        }
        return tagsTab;
    }

    BDDGetTags.prototype.getTagsShare = function(id){
        var sql = "SELECT id_tag FROM freeskill.tags_share WHERE id_user = '"+ id +"';";
        var reqTag = queryDB(sql);
        return this.getTags(reqTag);
    }

    BDDGetTags.prototype.getTagsDiscover = function(id){
        var sql = "SELECT id_tag FROM freeskill.tags_discover WHERE id_user = '"+ id +"';";
        var reqTag = queryDB(sql);
        //var reqTagName = queryDB(sql);
        return this.getTags(reqTag);
    }

    BDDGetTags.prototype.getTagShare = function(id,idtag){
        var sql = "SELECT id_user,UPPER(id_tag) as tag FROM freeskill.tags_share WHERE id_user="+id+" AND id_tag = '"+ idtag +"';";
        var sql = "SELECT id_user,UPPER(id_tag) as tag FROM freeskill.tags_share WHERE id_user="+id+" AND id_tag = '"+ idtag +"';";
        var reqTag = queryDB(sql);
        return this.getTagById(reqTag[0].tag);
    }

    BDDGetTags.prototype.getTagDiscover = function(id,idtag){
        var sql = "SELECT id_user,UPPER(id_tag) as tag FROM freeskill.tags_discover WHERE id_user="+id+" AND id_tag = '"+ idtag +"';";
        var reqTag = queryDB(sql);
        return this.getTagById(reqTag[0].tag);
    }

    BDDGetTags.prototype.getTagInKey = function(id,tag,key){
        if (key=="tags_share"){
            return this.getTagShare(id,tag);
        } else if (key=="tags_discover"){
            return this.getTagDiscover(id,tag);
        }
    }

    return BDDGetTags;
})();

module.exports = BDDGetTags;