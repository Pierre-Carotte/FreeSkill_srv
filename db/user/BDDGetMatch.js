var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetMatch = (function(){
    var BDDGetMatch = function(){
    };

    BDDGetMatch.prototype.getIdMatch = function(user1,user2){
        var res = connection.call("GetIdMatch", [user1,user2]);
        //console.log(res[0]);
        return res[0];
    }

    BDDGetMatch.prototype.getIdMatches = function(user1){
        var res = connection.call("GetIdMatches", [user1]);
        //console.log(res[0]);
        return res[0];
    }



    return BDDGetMatch;
})();

module.exports = BDDGetMatch;