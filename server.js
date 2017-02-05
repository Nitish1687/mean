/**
 * Created by nsm1211 on 2/5/17.
 */
const express = require("./config/express");

const app = express();

app.listen(8000);

module.exports = app;

console.log('server up and running at 8000 port');

