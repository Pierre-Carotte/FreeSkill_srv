var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetProfile = (function(){
    var BDDSetProfile = function(){
    };

    BDDSetProfile.prototype.setProfile = function(login,col,val){
        console.log(col);
        var res = connection.call("setProfile", [col,val,login]);
        console.log("Setted Profile");
        return res;
    }

    BDDSetProfile.prototype.setTag = function(login,table,idTag,destiny){
        if (destiny=="ADD"){
            var reqTag = connection.call("addTag", [table,idTag,login]);
            return reqTag;
        } else if (destiny=="DEL"){
            var reqTag = connection.call("deleteTag", [table,idTag,login]);
            return reqTag;
        }
    }

    return BDDSetProfile;
})();

module.exports = BDDSetProfile;