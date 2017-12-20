console.log("*** Judgement Cleaner : running... ***");
var SetJudgement = require('../../db/user/BDDSetJudgement');

var setJudgement = new SetJudgement();
setJudgement.deletePerishedJudgements();

console.log("*** Judgement Cleaner : Process ended. ***");