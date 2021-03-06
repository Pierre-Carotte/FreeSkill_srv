var express = require('express');
var router = express.Router();
var v = require.main.require('./utils/variables');
var WebToken = require(v.pathModule.webToken);
var SetJudgement = require.main.require(v.pathModule.BDDSetJudgement);
var jwt = new WebToken();

/* GET users listing. */

router.post('/', function(req, res, next){
    var decode = jwt.decode(req.headers[v.keyAcessToken]);

    //in bytes
    var size = req.files.img.data.length;
    console.log(size);
    console.log(v.mimetype );

    //mimetype : image/png
    var type = req.files.img.mimetype;
    var img = req.files.img;

    // test if size image is lower than 1Mo and mimetype is "image/png"
    //if(size < v.maxSizeImage && type == v.mimetype ){
    if(size < v.maxSizeImage){
        //path
        path = v.pathImg + decode.idUser + v.imgExtension;
        console.log(path);
        img.mv(path, function(err) {
            if (err)
                return res.status(200).json({success: true, message:  "Error file upload"});
            res.status(200).json({success: true, message:  "File uploaded"});
        });
    }else{

        console.log("Error: upload image");
        res.status(200).json({success: true, message:  "Error file upload"});
    }
});



module.exports = router;