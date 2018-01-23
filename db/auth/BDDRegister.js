var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDRegister = (function(){
    var BDDRegister = function(){
    };

    BDDRegister.prototype.register = function(firstname, lastName, email, password ){
        if(this._verifyMail(email)){
            connection.call("insert_user", [firstname,lastName, email, password]);
            return true;
        }
        return "mail is used";
    }
    BDDRegister.prototype._verifyMail = function(email){
        //verify if email is already registered
        return (connection.call("select_email", [email]).length == 1) ? true : false;
    }

    return BDDRegister;
})();

module.exports = BDDRegister;