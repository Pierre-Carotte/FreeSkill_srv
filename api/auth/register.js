var express = require('express');
var router = express.Router();

/*
Firstname
name
email
password
gps
 */
/*
   console.log(req.body);
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },

 */

/*
Middleware to test params in the body:
firstname
name
email
password
gps
 */

var parmasRegister = ['firstname', 'name', 'email', 'password', 'gps'];
router.use((req, res, next) => {
    var verify = testParams(req.body, parmasRegister);
    if(verify !== true){
       res.send('error:register' + verify, 400);
       return false;
    }
    if(!verifyMail(req.body.email)){
        res.send('error: invalide mail', 400);
        return false;
    }
    //test if email is correct

    next();
});

/*
Request register
 */
router.post('/register', function(req, res, next) {
   // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("register");
    res.send('register');
});

module.exports = router;


/*
 test if there are all parameters in request register
 if a parameter is missing return the name else return true;
 */

function testParams(params, parmasTest){
    for( param of parmasTest){
        if(!(param in params)){
            console.log(param);
            return param;
        }
        //console.log(param);
    }
    return true;
}

function verifyMail(mail)
{
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if(!regex.test(mail)){
        return false;
    }
    return true;
}