var queryDB = require('../queryDB');
var connection = require('../connection')

var BDDMessage = (function(){
    var BDDMessage = function(){
    };

    BDDMessage.prototype.setMessage = function(user1,user2,content){
        result = connection.call("insertMessage", [user1,user2,content]);
        return result;
    }

    BDDMessage.prototype.getMessages = function(id,id2){
        result = connection.call("getMessages", [id,id2]);
        result.pop();
        return result;
    }

    BDDMessage.prototype.getLastMessage = function(id,id2){
        result = connection.call("getLastMessage", [id,id2]);
        result.pop();
        return result;
    }

    BDDMessage.prototype.getMessageList = function (id){
        console.log("GetMessageList");
        var users = connection.call("GetMatches", [id]);
        users.pop();
        var res = [];
        for (user in users){
            res.push({id:users[user].friend,matchTime:users[user].matchTime, first_name:users[user].name,messageList: []});
        }

        console.log(users[user]);

        for (user in res){
            //console.log(res[user]);
            var messages = this.getMessages(id,res[user].id);
            console.log(messages);
            //res[user].messageList=messages;
            for (num in messages){
                //console.log(messages[num]);
                res[user].messageList.push(messages[num]);
            }
        }

        /*for (yo in res){
            for (yop in res[yo].messageList){
                console.log(res[yo].messageList[yop].message);
            }
        }*/

        var date1;
        var date2;

        for(var i=0; i< res.length; i++){
            //console.log(i);
            if(res[i].messageList.length < 1){
                date1 = new Date(res[i].matchTime);
                //console.log(date1);
            }else{
                date1 = new Date(res[i].messageList[res[i].messageList.length-1].dath_message);
                //console.log(date1);
            }
            //console.log("i+1=" + parseInt(i+1) + "res.length=" + res.length )
            for(var j=parseInt(i)+1; j< res.length; j++) {
                //console.log(j);
                if (res[j] != undefined) {
                    if (res[j].messageList.length < 1) {
                        date2 = new Date(res[j].matchTime);
                        //console.log(date2);
                    } else {
                        date2 = new Date(res[j].messageList[res[j].messageList.length - 1].dath_message);
                        //console.log(date2);
                    }
                    //console.log("--------------------------");
                    if (date1 < date2) {
                        //console.log(date1 +"<"+ date2);
                        var temp = res[j];
                        res[j] = res[i];
                        res[i] = temp;
                        date1 = date2;
                    } else {
                        //else nothing but debug below
                        //console.log(date1 +">"+ date2);
                        //console.log("nope");
                    }
                }
            }
        }
        return res;
    }

    BDDMessage.prototype.updateIsRead = function(user1,user2,idmsg){
        result = connection.call("setIsRead", [user1,user2,idmsg]);
        return result;
    }


    return BDDMessage;
})();

module.exports = BDDMessage;