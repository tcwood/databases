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
      db.query('SELECT messages FROM messages', [], function(err, rows) {
        if (err) {
          console.log(err);
          console.log('this error specifically');
        } else {
          res.writeHead(200, headers);
          res.end(JSON.stringify(rows));
          // console.log(rows);
        }
      });

    }, // a function which produces all the messages
    post: function (message) {
      var messageBody = {
        messages: message.message
      };

      var roomBody = {
        roomname: message.roomname
      };

      db.query('INSERT INTO rooms SET ?', roomBody, function(err, results) {
        if (err) { console.log(err); }
        console.log('we out here');
      });

      db.query('INSERT INTO messages SET ?', messageBody, function(err, results) {
        if (err) { console.log(err); }
        console.log(results);
        console.log('message post successful!');
      });   
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userName) {
      console.log(userName);
      db.query('INSERT INTO users SET ?', userName, function(err, results) {
        if (err) { console.log(err); }
        console.log('successful!');
      });
    }
  }
};

// db.query('INSERT INTO messages SET ?', post, function(err, result) {
//       if (err) throw err;
//     });

// INSERT INTO `users` (`username`,`id`) VALUES
// ('','');
// INSERT INTO `messages` (`id`,`messages`,`id_users`,`id_rooms`) VALUES
// ('','','','','');