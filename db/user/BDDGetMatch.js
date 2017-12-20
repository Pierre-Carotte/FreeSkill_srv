var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetMatch = (function(){
    var BDDGetMatch = function(){
    };

    BDDGetMatch.prototype.getMatch = function(user1,user2){
        var sql = "SELECT * FROM freeskill.matches WHERE id_user1='"+user1+"' AND id_user2='"+user2+"' OR id_user1='"+user2+"' AND id_user2='"+user1+"';";
        console.log(sql);
        var res = queryDB(sql);
        //console.log(res[0]);
        return res[0];
    }

    return BDDGetMatch;
})();

module.exports = BDDGetMatch;