var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDDelMatch = (function(){
    var BDDDelMatch = function(){
    };

    BDDDelMatch.prototype.delMatch = function(user1,user2){
        var res = connection.call("delete_match", [user1,user2]);
        return res[0];
    }

    return BDDDelMatch;
})();

module.exports = BDDDelMatch;