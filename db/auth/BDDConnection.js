var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDConnection = (function(){
    var BDDConnection = function(){
    };

    BDDConnection.prototype.testPassword = function(login, pwdHash){
        sql = "SELECT pwd FROM freeskill.users WHERE email = '"+ login +"';";
        reqPwd = queryDB(sql);
        if(pwdHash !=reqPwd[0].pwd){
            return false;
        }
        return true;
    }

    BDDConnection.prototype.testLogin = function(login){
        sql = "SELECT * FROM freeskill.users WHERE email = '"+ login+"';";
        if(queryDB(sql).length==0){
            console.log(queryDB(sql));
            return false;
        }
        return true;
    }

    BDDConnection.prototype.getUserID = function(login){
        sql = "SELECT id FROM freeskill.users WHERE email = '"+login+"';";
        req = queryDB(sql);
        if(req.length !=0) {
            return queryDB(sql)[0].id;
        }
        return false;
    }
    return BDDConnection;
})();

module.exports = BDDConnection;