/*
A reusable DB object
 */
var url = 'express-angular-seed';
var db = require('mongojs').connect(url);

module.exports = db;