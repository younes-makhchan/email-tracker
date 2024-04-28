
// Importing required modules
require("./loadEnv")
// Importing required modules
const express = require('express');
const logger = require('./config/logger');
const routes = require('./app/route');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

//mongoose connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL, {dbname:"emailTracker"});
mongoose.connection.on('error', () => {
    logger.error(`unable to connect to database: ${process.env.MONGO_URL}`);
});
// Creating an instance of express app
const app = express();
app.use(cors())
app.use(express.static('./public'));
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});
app.use('/', routes);
// Start the server
app.listen(3000, () => logger.info('server started'));
process.on('uncaughtException', function(err) {
    logger.error('error', err);
});

