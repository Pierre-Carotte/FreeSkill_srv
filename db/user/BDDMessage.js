var queryDB = require('../queryDB');
var connection = require('../connection');

var BDDMessage = (function(){
    var BDDMessage = function(){
    };

    BDDMessage.prototype.setMessage = function(user1,user2,content){
        var sql = "INSERT INTO freeskill.messages(id,id_user1,id_user2,message) VALUES (NULL,'"+user1+"','"+user2+"',"+content+");";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    BDDMessage.prototype.getMessages = function(user1,user2){
        var sql = "SELECT id_user1,message,dath_message FROM freeskill.messages WHERE id_user1='"+user1+"' AND id_user2='"+user2+"';";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    return BDDMessage;
})();

module.exports = BDDMessage;