var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMatch = require('./BDDSetMatch');

// TO TEST
var BDDSetJudgement = (function(){
    var BDDSetJudgement = function(){
    };

    BDDSetJudgement.prototype.modifyJudgement = function(login,judged,meet){
        if (meet == 'MEET'){
            if (this.getJudgement(judged,login)==undefined){
                var res = this.createJudgement(login,judged);
            }else{
                var matcher = new BDDSetMatch();
                this.deleteJudgement(judged,login);
                matcher.addMatch(login,judged);
                res="MATCH";
            }
        } else {
            var res = this.createJudgement(login,judged);
        }
        return res;
    }

    BDDSetJudgement.prototype.getJudgement = function(login,judged){
        var res = connection.call("getJudgement", [login,judged]);
        // console.log(res);
        return res;
    }

    BDDSetJudgement.prototype.createJudgement = function(login,judged){
        //console.log(this.getJudgement(login,judged));
        if (this.getJudgement(login,judged).length === 0 ){
            var res = connection.call("createJudgement", [login,judged]);
            console.log("Inserted judgement "+login+" to "+judged);
            return res;
        }
    }

    BDDSetJudgement.prototype.deletePerishedJudgements = function(){
        var interval = 0;
        var res = connection.call("deletePerishedJudgements", [interval]);
        console.log("deleted perished judgements (before "+ interval +" months).");
        return res;
    }

    BDDSetJudgement.prototype.deleteJudgement = function(login,judged){
        var res = connection.call("deleteJudgement", [login,judged]);
        console.log("Deleted judgement "+ login +" to "+ judged);
        return res;
    }

    BDDSetJudgement.prototype.isAuthorise = function(user1, user2){
        //console.log(connection.call('autorize_get_image', [user1, user2]).length);
        return connection.call('autorize_get_image', [user1, user2]).length > 1 ? true : false;
    }
    return BDDSetJudgement;
})();

module.exports = BDDSetJudgement;