var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDMeets = (function(){
    var BDDMeets = function(){

    };

    BDDMeets.prototype.getMarkableMeet = function(id1,id2){
        result = connection.call("getMarkableMeet", [id1,id2]);
        console.log(result);
        result.pop();
        return result;
    }

    BDDMeets.prototype.getMeets = function(id){
        result = connection.call("getMeets", [id]);
        result.pop();
        return result;
    }

    return BDDMeets;
})();

module.exports = BDDMeets;