var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDAddTag = (function(){
    var BDDAddTag = function(){
    };

    BDDAddTag.prototype.addNewTagInDB = function(tag){
        sql = "INSERT INTO freeskill.tags (id,tag) VALUES (NULL,'"+tag+"');";
        console.log(sql);
        var reqTag = queryDB(sql);
        console.log("Added tag "+tag+" in table tags.");
        return 1;
    }

    return BDDAddTag;
})();

module.exports = BDDAddTag;