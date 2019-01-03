var queryDB = require('../queryDB');
var connection = require('../connection');

// TO TEST
var BDDSetIDFCM = (function(){
    var BDDSetIDFCM = function(){
    };

    BDDSetIDFCM.prototype.updateFCM = function(id_user, fcm){
        return connection.call('insert_fcm_id', [fcm, id_user]);
        //return res;
    }

    return BDDSetIDFCM;
})();

module.exports = BDDSetIDFCM;