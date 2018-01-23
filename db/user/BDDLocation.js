var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDLocation = (function(){
    var BDDLocation = function(){
    };

    BDDLocation.prototype.updateLocation = function(id, lat, lon){
        console.log("BDDLocation.updateLocation: "+ id + ", " + lat + ", " + lon);
        connection.call("update_location", [id, lat, lon]);
        return true;
    }

    BDDLocation.prototype.getLocation = function(idUser1, idUser2){
        console.log("BDDLocation.getLocation: "+ idUser1 + ", " + idUser2);
        return connection.call("select_location", [idUser1, idUser2])[0].distance;
    }
    return BDDLocation;
})();

module.exports = BDDLocation;