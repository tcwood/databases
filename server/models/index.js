var db = require('../db');
// var Promise = require('bluebird');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

module.exports = {
  messages: {
    get: function (res) {
      db.queryGet('SELECT messages FROM messages', function(rows) {
        res.writeHead(200, headers);
        res.end(JSON.stringify(rows));
      });
    },

    post: function (message, res) {
      var messageBody = {                     //use this for POST request
        messages: message.message,
        id_users: '',
        id_rooms: ''
      };
      console.log(message);
      var roomName = {roomname: message.roomname};        //Use these for querying ids
      var userName = {username: message.username};

      db.queryPost('INSERT IGNORE INTO users SET ?', userName, function() {
        db.queryGet('SELECT id FROM users WHERE username ="' + message.username + '"', function(rows) {
          messageBody.id_users = rows[0].id;

          db.queryPost('INSERT IGNORE INTO rooms SET ?', roomName, function() {
            db.queryGet('SELECT id FROM rooms WHERE roomname ="' + message.roomname + '"', function(rows) {
              messageBody.id_rooms = rows[0].id;

              db.queryPost('INSERT INTO messages SET ?', messageBody, function() {
                res.end();
              });
            });
          });
        });
      });
    }
  },

  users: {
    get: function (res) {
      db.queryGet('SELECT username FROM users', function(rows) {
        res.writeHead(200, headers);
        res.end(JSON.stringify(rows));
      });
    },
    post: function (userName, res) {
      var userBody = {
        username: userName.username
      };
      db.queryPost('INSERT IGNORE INTO users SET ?', userBody, function() {
        res.end();
      });
    }
  },

  rooms: {
    get: function(res) {
      db.queryGet('SELECT roomname FROM rooms', function(rows) {
        res.writeHead(200, headers);
        res.end(JSON.stringify(rows));
      });
    },

    post: function(room, res) {
      var roomBody = {
        roomname: room.roomname
      };

      db.queryPost('INSERT IGNORE INTO rooms SET ?', roomBody, function() {
        res.end();
      });
    }
  }
};