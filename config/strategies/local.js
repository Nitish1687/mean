/**
 * Created by nsm1211 on 2/10/17.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('mongoose').model('Employee');

module.exports = function () {
    passport.use(new LocalStrategy((username, password, done) => {
        Employee.findOne({username: username}, (err, employee) => {
            if (err) {
                done(err)
            }

            if (!employee) {
                return done(null, false, {message: 'Unknown employee'})
            }

            if (!employee.authenticate(password)) {
                return done(null, false, {message: 'Invalid password'})
            }

            return done(null, employee)

        })
    }))
};
