const variables = {
    //key for acces token
    keyAcessToken : 'x-access-token',
    pathImg : "./img/",
    pathDefautImg : './img/default.png',
    imgExtension : ".png",
    //variables for module connection.js
    //parmasRegister : ['email', 'password', 'gps'], //TODO add gps during step connection
    parmasRegister : ['email', 'password'],
    // Messages:
    messages : {
        invalidMail : 'error: invalid mail',
        badPassword : 'error: bad password',
        noMatchs : 'error: no match in matches',
        messageSend : 'message has been sent'
    },

    //paths of all modules
    pathModule : {
        //api modules:
        //bdd modules:
        dbConfig : './config/dbConfig.js',
        BDDConnection: './db/auth/BDDConnection',
        BDDSearchProfile : './db/user/BDDSearchProfile',
        BDDSetJudgement : './db/user/BDDSetJudgement',
        BDDMessage : './db/user/BDDMessage',
        BDDGetMatch : './db/user/BDDGetMatch',
        BDDGetProfile : './db/user/BDDGetProfile',
        BDDGetTags : './db/user/BDDGetTags',
        BDDMeets : './db/user/BDDMeets',
        //utils modules:
        webToken : (__dirname + '/webToken'),
        utilsFunctions: './utils/utilsFunctions'
    }
};

module.exports = variables;