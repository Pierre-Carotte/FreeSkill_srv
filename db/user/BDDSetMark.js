var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMark = (function(){
    var BDDSetMark = function(){
    };

    BDDSetMark.prototype.setMark = function(user1,user2,mark,tag,message){
        var marking = connection.call("setMark", [user1,user2,mark,tag,message]);
        console.log(user1+ " Marks "+ user2 + " on tag: " + tag + " (value: " + mark + " , message: " + message +")");
        this.calculateAverage(user2);
        return true;
    }

    BDDSetMark.prototype.calculateAverage = function(user){
        var calc = connection.call("setMarkAverage", [user]);
        console.log("USER "+ user+ " average setted.");
        return true;
    }

    return BDDSetMark;
})();

module.exports = BDDSetMark;