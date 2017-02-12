/**
 * Created by nsm1211 on 2/10/17.
 */

const mongoose = require('mongoose');
const passport = require('passport');

module.exports = function () {

    require('./strategies/local')();

    const Employee = mongoose.model('Employee');

    passport.serializeUser((employee, done) => {
        done(null, employee.id)
    });

    passport.deserializeUser((id, done) => {
        Employee.findOne({_id: id}, '-password -salt', (err, employee) => {
            done(err, employee)
        })
    });
};
