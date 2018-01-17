var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDMeets = (function(){
    var BDDMeets = function(){

    };

    BDDMeets.prototype.getMeets = function(id){
        result = connection.call("getMeets", [id]);
        result.pop();
        return result;
    }

    return BDDMeets;
})();

module.exports = BDDMeets;