var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var SetJudgement = require('../../db/user/BDDSetJudgement');
var jwt = new WebToken();

router.put('/', function(req, res, next) {
    console.log(SetJudgement);
    var setJudgement = new SetJudgement();
    console.log(jwt.decode(req.headers['x-access-token']));
    console.log("Id judger : "+jwt.decode(req.headers['x-access-token']).idUser);
    console.log("Id judged : "+req.query.judged);
    console.log("meet : "+req.query.meet);
    setJudgement.createJudgement(jwt.decode(req.headers['x-access-token']).idUser,req.query.judged);
    var match = setJudgement.modifyJudgement(jwt.decode(req.headers['x-access-token']).idUser,req.query.judged,req.query.meet);
    if (match == "MATCH") {
        res.status(200).json({success: true, message: 'judgement done', match: 1});
    } else {
        res.status(200).json({success: true, message: 'judgement done', match: 0});
    }
}
});

module.exports = router;