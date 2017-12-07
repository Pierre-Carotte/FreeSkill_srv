var jwt = require('jsonwebtoken');
var config = require('../config/jswSecret');
var WebToken =  (function(){
    var WebToken = function(){
    }

    WebToken.prototype.createToken = function(id){
        var token = jwt.sign(id, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    }

    WebToken.prototype.verify= function(token){
        return jwt.verify(token, config.secret);
    }

    WebToken.prototype.decode = jwt.decode;
    return WebToken;
})();

module.exports = WebToken;