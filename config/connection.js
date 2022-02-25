const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-media-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;