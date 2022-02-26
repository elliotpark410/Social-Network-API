// require express to create http routes
const express = require('express');

// require connection object to connect to MongoDB
const db = require('./config/connection');

// requires routes directory
const routes = require('./routes');

// PORT is equal to whatever is in the environemtn variable or 3001
const PORT = process.env.PORT || 3001;


const app = express();

// for POST and PUT requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// once the database connect, listen to PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}!`);
  });
});
