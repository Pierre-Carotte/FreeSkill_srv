var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMatch = require('./BDDSetMatch');

// TO TEST
var BDDSetJudgement = (function(){
    var BDDSetJudgement = function(){
    };

    BDDSetJudgement.prototype.setJudgement = function(login,judged,meet){
        if (meet == 'MEET'){
            var mirror = this.getJudgement(judged,login);
            if (this.getJudgement(judged,login)==undefined){
                var res = this.modifyJudgement(login,judged,meet);
            }else{
                if(mirror.meet == 'MEET'){
                    var matcher = new BDDSetMatch();
                    this.deleteJudgement(judged,login);
                    this.deleteJudgement(login,judged);
                    matcher.addMatch(login,judged);
                    res="MATCH";
                } else {
                    var res = this.modifyJudgement(login,judged,meet);
                }
            }
        } else {
            var res = this.modifyJudgement(login,judged,meet);
        }
        return res;
    }

    BDDSetJudgement.prototype.modifyJudgement = function(login,judged,meet){
        var res = connection.call("setJudgement", [login,judged,meet]);
        console.log("Judgement setted : "+login+" "+meet+" "+judged);
        return res;
    }


    BDDSetJudgement.prototype.getJudgement = function(login,judged){
        var res = connection.call("getJudgement", [login,judged]);
        res.pop();
        // console.log(res);
        return res[0];
    }

    BDDSetJudgement.prototype.createJudgement = function(login,judged){
        console.log(this.getJudgement(login,judged));

        if (this.getJudgement(login,judged) == undefined ){
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