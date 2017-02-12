/**
 * Created by nsm1211 on 2/9/17.
 */

const passport = require('passport');
const employees = require('../controllers/employee.server.controller');


module.exports = (app) => {

    app.route('/employees').get(employees.employeesList).post(employees.create);
    app.route('/employees/:employeeId').get(employees.read).put(employees.updateEmployee).delete(employees.delete);
    app.param('employeeId', employees.employeeById);

    app.route('/signout').get(employees.signout);
    app.route('/signup').get(employees.renderSignup).post(employees.signup);
    app.route('/signin').get(employees.renderSignin).post(
        passport.authenticate('local',
            {
                successRedirect: '/',
                failureRedirect: '/signin',
                session: true,
                failureFlash: true
            }
        )
    );

};
