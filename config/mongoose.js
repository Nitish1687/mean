/**
 * Created by nsm1211 on 2/9/17.
 */


const config = require('./config');
const mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db);
    require('../app/models/employee.server.model');
    return db;
};
