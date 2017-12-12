var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.getProfile = function(login){
        sql = "SELECT * FROM freeskill.users WHERE email = '"+ login +"';";
        reqProfile = queryDB(sql);
        return reqProfile;
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;