var queryDB = require('../queryDB');
var CallDB = require('../CallDB');
var connection = require('../connection');
var BDDSearchProfile = (function(){
    var BDDSearchProfile = function(){
    };

    BDDSearchProfile.prototype.searchProfile = function(id){
        //sql = "CALL `searchProfil`('3');";
        var reqTag = connection.call("searchProfil", [id]);
        var idList = [];
        for(let element of reqTag){
            if(element.id_user != undefined){
                idList.push(element.id_user);
            }
        }
        return idList;
    }

    BDDSearchProfile.prototype.searchProfileStep2 = function(id){
        //sql = "CALL `searchProfil`('3');";
        var reqTag = connection.call("searchProfilStep2", [id]);
        var idList = [];
        for(let element of reqTag){
            if(element.id_user != undefined){
                idList.push(element.id_user);
            }
        }
        return idList;
    }

    BDDSearchProfile.prototype.searchProfileStep3 = function(id){
        //sql = "CALL `searchProfil`('3');";
        var reqTag = connection.call("searchProfilStep3", [id]);
        var idList = [];
        for(let element of reqTag){
            if(element.id_user != undefined){
                idList.push(element.id_user);
            }
        }
        return idList;
    }

    return BDDSearchProfile;
})();

module.exports = BDDSearchProfile;