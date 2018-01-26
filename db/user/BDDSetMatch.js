var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMatch = (function(){
    var BDDSetMatch = function(){
    };

    BDDSetMatch.prototype.addMatch = function(user1,user2){
        var reqTag = connection.call("addMatch", [user1,user2]);
        return reqTag;
    }

    return BDDSetMatch;
})();

module.exports = BDDSetMatch;