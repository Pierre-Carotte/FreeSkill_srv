var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetProfile = (function(){
    var BDDGetProfile = function(){
    };

    BDDGetProfile.prototype.setProfile = function(login,col,val){
        //UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
        sql = "UPDATE freeskill.users SET "+col+" = '"+val+"' WHERE email = '"+ login +"';";
        res = queryDB(sql);
        return res;
    }

    return BDDGetProfile;
})();

module.exports = BDDGetProfile;