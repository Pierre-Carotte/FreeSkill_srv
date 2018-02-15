var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDSetMeet = (function(){
    var BDDSetMeet = function(){
    };

    BDDSetMeet.prototype.setMeet = function(user1,user2,dataa){
        var data = JSON.parse(dataa);
        var dath_begin = data.dath_begin;
        var dath_end = data.dath_end;
        var place = data.place;
        var tag_share = data.tag_share;
        var tag_discover = data.tag_discover;
        var state = data.state;
        var getmeet = connection.call("getMeet", [user1,user2]);
        getmeet.pop();
        //var meet = connection.call("setMeet", [user1,user2,dath_begin,dath_end,place,tag_share,tag_discover,state]);
        console.log(user1+ " wants to meet "+ user2 + " dath_begin : " + dath_begin
            + " dath_end : " + dath_end + " place: " + place + " tag_share: " + tag_share
            + " tag_discover: "+ tag_discover + " state: " + state);
        return true;
    }

    return BDDSetMeet;
})();

module.exports = BDDSetMeet;