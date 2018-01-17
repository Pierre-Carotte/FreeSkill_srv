var Mysql = require('sync-mysql');
var variables = require.main.require('./utils/variables');
var config = require.main.require(variables.pathModule.dbConfig);
module.exports = new Mysql(config);
