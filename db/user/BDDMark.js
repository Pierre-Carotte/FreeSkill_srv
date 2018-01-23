var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDMark = (function(){
    var BDDMark = function(){

    };

    BDDMark.prototype.getMarks = function(id){
        result = connection.call("getMarks", [id]);
        result.pop();
        return result;
    }

    return BDDMark;
})();

module.exports = BDDMark;