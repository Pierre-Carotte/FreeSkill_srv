var queryDB = require('../queryDB');
var connection = require('../connection');
var BDDGetMark = (function(){

    var BDDGetMark = function(){

    };

    BDDGetMark.prototype.getMarks = function(id){
        tags = connection.call("getIdMarkedTags", [id]);
        tags.pop();
        var response=[];
        for (tag in tags){
            var tagName = connection.call("getTagById", [tags[tag].id_tag]);
            tagName.pop();
            response.push({tag_name:tagName[0].tag,average_mark:0,marks:[]});
            this.getTagMarks(id,tags[tag],response[tag]);
        }

        /*var moyenne=0;
        var somme=0;
        for (tag in response){
            if(response[tag].marks.length>0){
                somme++;
                moyenne+=response[tag].average_mark;
            }
        }
        if (somme!=0){
            moyenne/=somme;
        }

        console.log(Math.round(moyenne*2)*0.5);
        var val = (Math.round(moyenne*2)*0.5).toString();
        console.log(val+" "+email);
        connection.call("setProfile", ["average_mark",val,email]);*/
        return response;
    }

    BDDGetMark.prototype.getTagMarks = function(id,tag,response){
        //console.log(tag);
        var tagMarks = connection.call("getMarks", [id,tag.id_tag]);
        tagMarks.pop();

        var moyenne=0;
        var somme=0;
        for (tagMark in tagMarks){
            response.marks.push(tagMarks[tagMark]);
            somme++;
            moyenne+=tagMarks[tagMark].mark;
        }
        if (somme!=0){
            moyenne/=somme;
        }
        response.average_mark = Math.round(moyenne*2)*0.5;
    }

    return BDDGetMark;
})();

module.exports = BDDGetMark;