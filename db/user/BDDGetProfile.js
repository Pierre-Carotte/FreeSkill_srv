var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.getPersonalProfile = function(login){
        sql = 'SELECT * FROM freeskill.users WHERE email = ?;';
        reqProfile = connection.query(sql, [login]);
        return reqProfile;
    }

    BDDGetProfile.prototype.getUserProfile = function(id){
        sql = 'SELECT id,first_name,is_assos,average_mark,description FROM freeskill.users WHERE id = ?;';
        reqProfile = connection.getRecord("freeskill.users", id);
        return reqProfile;
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;