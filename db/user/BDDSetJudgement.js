var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMatch = require('./BDDSetMatch');

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
        var sql = "SELECT * FROM freeskill.judgements WHERE id_user1 = '"+ login +"' AND id_user2 = '"+judged+"';";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    BDDSetJudgement.prototype.createJudgement = function(login,judged){
        if (this.getJudgement(login,judged) == undefined){
            var sql = "INSERT INTO freeskill.judgements (id_user1,id_user2,meet) VALUES ('"+login+"','"+judged+"','WAIT');";
            console.log(sql);
            var res = queryDB(sql);
            return res;
        }
    }

    BDDSetJudgement.prototype.deletePerishedJudgements = function(){
        var sql = "DELETE FROM freeskill.judgements WHERE timestamp<DATE_SUB(NOW(), INTERVAL 1 MONTH);";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    BDDSetJudgement.prototype.deleteJudgement = function(login,judged){
        var sql = "DELETE FROM freeskill.judgements WHERE id_user1='"+login+"' AND id_user2='"+judged+"';";
        console.log(sql);
        var res = queryDB(sql);
        return res;
    }

    return BDDSetJudgement;
})();

module.exports = BDDSetJudgement;