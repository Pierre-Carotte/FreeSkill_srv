var jwt = require('jsonwebtoken');
var config = require('../config/jswSecret');
var WebToken =  (function(){
    var WebToken = function(){

    }
    WebToken.prototype.createToken = function(id){
        console.log(id);
        var token = jwt.sign({ id: id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    }

    WebToken.prototype.verifyToken = function(id){
        console.log(id);

        return token;
    }
    return WebToken;
})();

module.exports = WebToken;