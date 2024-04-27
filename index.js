
// Importing required modules


// Importing required modules
const express = require('express');
const logger = require('./config/logger');
const routes = require('./app/route');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Creating an instance of express app
const app = express();

app.use(express.static('./public'));

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.get('/hello', (req, res) => {
    res.send('Hello, world!');
  });
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
