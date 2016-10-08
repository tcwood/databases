var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('controller messages req body');

      models.messages.get(res);

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log('controller message post', req.body);

      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      // console.log('controller user post', req.body);

      models.users.post(req.body);
      res.end();
    }
  }
};

