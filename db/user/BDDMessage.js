var queryDB = require('../queryDB');
var connection = require('../connection');

var BDDMessage = (function(){
    var BDDMessage = function(){
    };

    BDDMessage.prototype.setMessage = function(user1,user2,content){
        result = connection.call("insertMessage", [user1,user2,content]);
        return result;
    }

    BDDMessage.prototype.getMessages = function(id){
        result = connection.call("getMessages", [id]);
        result.pop();
        return result;
    }

    return BDDMessage;
})();

module.exports = BDDMessage;