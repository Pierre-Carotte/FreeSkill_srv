var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.getPersonalProfile = function(login){
        sql = "SELECT * FROM freeskill.users WHERE email = '"+ login +"';";
        reqProfile = queryDB(sql);
        return reqProfile;
    }

    BDDGetProfile.prototype.getUserProfile = function(id){
        sql = "SELECT id,first_name,is_assos,average_mark,decription FROM freeskill.users WHERE id_user = '"+ id +"';";
        reqProfile = queryDB(sql);
        return reqProfile;
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;