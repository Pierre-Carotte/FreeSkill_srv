var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.getPersonalProfile = function(login){
        reqProfile = connection.call("getPersonalProfile", [login]);
        reqProfile.pop();
        return reqProfile;
    }

    BDDGetProfile.prototype.getUserProfile = function(id){
        reqProfile = connection.call("getUserProfile", [id]);
        reqProfile.pop();
        return reqProfile[0];
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;