/**
 * Created by nsm1211 on 2/5/17.
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// MongoDb connection for mean database
const mongoDb = require('./config/mongoose');

const connection = mongoDb();

// Express server configuration 
const express = require("./config/express");

const app = express();

app.listen(8000);

module.exports = app;

console.log('server up and running at 8000 port');

