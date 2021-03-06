/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'password',
      database: 'chat'
    });
    dbConnection.connect();

    // var tablename = 'messages'; // TODO: fill this out

     // Empty the db table before each test so that multiple tests
     // * (or repeated runs of the tests) won't screw each other up: 
    

    // dbConnection.query('truncate messages', done);
    // dbConnection.query('truncate users', done);
    // dbConnection.query('truncate rooms', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log(results);
          expect(results.length).to.equal(1);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].messages).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages SET ?';
    var queryArgs = {messages: 'Men like you can never change!'};
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { console.log(err); }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].messages).to.equal('Men like you can never change!');
        // expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });

  it('Should output all usernames from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO users SET ?';
    var queryArgs = {username: 'testUser'};
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { console.log(err); }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
        var userLog = JSON.parse(body);
        expect(userLog[0].username).to.equal('testUser');
        // expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });

  it('Should output all rooms from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO rooms SET ?';
    var queryArgs = {
                      roomname: 'testingRoom'
                    };
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { console.log(err); }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/rooms', function(error, response, body) {
        var roomLog = JSON.parse(body);
        expect(roomLog[1].roomname).to.equal('testingRoom');
        // expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});
