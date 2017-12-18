var express = require('express');
var router = express.Router();
var WebToken = require('../../utils/webToken');
var jwt = new WebToken();

/* GET users listing. */


router.get('/', function(req, res, next){
    //res.download('./img/'+jwt.decode(req.headers['x-access-token']).idUser+'.png');
    res.download('./img/12.png');
    //next();
});

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    res.download('./img/1.png');
//res.status(200).json(jwt.decode(req.headers['x-access-token']));
});

module.exports = router;


data = {
    
}