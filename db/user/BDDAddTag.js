var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDAddTag = (function(){
    var BDDAddTag = function(){
    };

    BDDAddTag.prototype.addNewTagInDB = function(tag){
        connection.call("insert_tag", [tag]);
        console.log("Added tag "+tag+" in table tags.");
        return true;
    }

    return BDDAddTag;
})();

module.exports = BDDAddTag;