var mysql = require('mysql');
var Promise = require('bluebird');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chat'
});

connection.connect(function(err) {
  if (err) { return console.log(err); }

  console.log('connection established');
});

module.exports.queryGet = function (queryStem, callback) {
  exports.connection.query(queryStem, [], function(err, rows) {
    if (err) {
      console.log('IAMVALJEAN!')
      console.log(err);
    } else {
      callback(rows);
    }
  });
};

module.exports.queryPost = function(queryStem, queryObj, callback) {
  exports.connection.query( queryStem, queryObj, function(err) {
    if (err) { 
      console.log(err);
    } 
    if (callback) {
      callback();         //Do we need to add a parameter here?
    } 
  });
};

module.exports.connection = connection;

