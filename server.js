/**
 * Created by nsm1211 on 2/5/17.
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const express = require("./config/express");

const db = configureMongoose();
const app = express();

app.listen(8000);

module.exports = app;

console.log('server up and running at 8000 port');

