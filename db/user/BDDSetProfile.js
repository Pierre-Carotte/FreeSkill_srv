var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.setProfile = function(login,col,val){
        sql = "UPDATE freeskill.users SET "+col+" = '"+val+"' WHERE email = '"+ login +"';";
        res = queryDB(sql);
        return res;
    }

    BDDGetProfile.prototype.setTag = function(login,table,idTag,destiny){
        if (destiny=="ADD"){
            sql = "INSERT INTO freeskill."+table+" (id_tag,id_user) VALUES ("+idTag+","+login+");";
            console.log(sql);
        } else if (destiny=="DEL"){
            sql = "DELETE FROM freeskill."+table+" WHERE id_tag="+idTag+" AND id_user="+login+";";
            console.log(sql);
        }
        res = queryDB(sql);
        //return res;
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;