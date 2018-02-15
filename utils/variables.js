const variables = {
    //key for acces token
    keyAcessToken : 'x-access-token',
    pathImg : "./img/",
    pathDefautImg : './img/default.png',
    imgExtension : ".png",
    maxSizeImage : 1000000,
    mimetype : 'image/png',
    //variables for module connection.js
    parmasRegister : ['email', 'password'],
    // Messages:
    messages : {
        invalidMail : 'Error: invalid mail.',
        badPassword : 'Error: bad password.',
        noMatchs : 'Error: no match in matches.',
        noMeet : 'Error: you have no meet to mark.',
        messageSent : 'Success: your message has been sent.',
        markSent : 'Success: your mark has been sent.',
        meetSent : 'Success: your meeting has been sent.'
    },

    //paths of all modules
    pathModule : {
        //api modules:
        //bdd modules:
        dbConfig : './config/dbConfig.js',
        BDDRegister: './db/auth/BDDRegister',
        BDDConnection: './db/auth/BDDConnection',
        BDDSearchProfile : './db/user/BDDSearchProfile',
        BDDSetJudgement : './db/user/BDDSetJudgement',
        BDDLocation : './db/user/BDDLocation',
        BDDMessage : './db/user/BDDMessage',
        BDDGetMatch : './db/user/BDDGetMatch',
        BDDDelMatch : './db/user/BDDDelMatch',
        BDDGetProfile : './db/user/BDDGetProfile',
        BDDGetTags : './db/user/BDDGetTags',
        BDDGetMeet : './db/user/BDDGetMeet',
        BDDSetMeet : './db/user/BDDSetMeet',
        BDDGetMark : './db/user/BDDGetMark',
        BDDSetMark : './db/user/BDDSetMark',
        //utils modules:
        webToken : (__dirname + '/webToken'),
        utilsFunctions: './utils/utilsFunctions'
    }
};

module.exports = variables;