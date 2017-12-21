var connection = require('./connection');
module.exports = function(sql, ...args){
    return connection.call(sql, args);
}
