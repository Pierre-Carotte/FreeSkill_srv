var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetTags = (function(){
    var BDDGetTags = function(){
    };

    BDDGetTags.prototype.getTag = function(id_tag){
        var sql = "SELECT * FROM freeskill.tags WHERE id = '"+ id_tag +"';";
        var reqTag = queryDB(sql);
        return reqTag[0];
    }

    BDDGetTags.prototype.getTags = function(tags){
        var tagsTab=[];
        for (id of tags) {
            tagsTab.push(this.getTag(id.id_tag));
            console.log(id);
        }
        return tagsTab;
    }

    BDDGetTags.prototype.getTagsShare = function(id){
        var sql = "SELECT * FROM freeskill.tags_share WHERE id_user = '"+ id +"';";
        var reqTag = queryDB(sql);
        console.log(reqTag);
        return this.getTags(reqTag);
    }

    BDDGetTags.prototype.getTagsDiscover = function(id){
        var sql = "SELECT * FROM freeskill.tags_discover WHERE id_user = '"+ id +"';";
        var reqTag = queryDB(sql);
        console.log(reqTag);
        return this.getTags(reqTag);
    }

    return BDDGetTags;
})();

module.exports = BDDGetTags;