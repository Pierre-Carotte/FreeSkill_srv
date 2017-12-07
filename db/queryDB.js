var connection = require('./connection');
module.exports = function(sql){
    return connection.query(sql);
}


