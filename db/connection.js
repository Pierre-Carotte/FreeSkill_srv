var Mysql = require('sync-mysql');
var config = require('../config/dbConfig.js');
//var con = mysql.createConnection(config);
//var pool =  mysql.createPool(config);
module.exports = new Mysql(config);
