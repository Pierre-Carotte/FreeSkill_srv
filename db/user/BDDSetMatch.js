var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMatch = (function(){
    var BDDSetMatch = function(){
    };

    BDDSetMatch.prototype.addMatch = function(user1,user2){
        var sql = "INSERT INTO freeskill.matches (id_user1,id_user2)  VALUES ('"+user1+"','"+user2+"');";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    return BDDSetMatch;
})();

module.exports = BDDSetMatch;