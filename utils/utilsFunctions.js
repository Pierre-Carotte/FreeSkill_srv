var utils = (function(){

    var utils = function(){
    }

    /*
 test if email is good
 */

    utils.prototype.verifyMail = function(mail){
        var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        if(!regex.test(mail)){
            return false;
        }
        return true;
    }

    /*
 test if there are all parameters in request register
 if a parameter is missing return the name else return true;
 */

    utils.prototype.testParams = function(params, paramsTest){
        for( param of paramsTest){
            if(!(param in params)){
                return param;
            }
        }
        return true;
    }
    return utils;
})();


module.exports = utils;