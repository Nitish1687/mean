/**
 * Created by nsm1211 on 2/9/17.
 */

const employees = require('../controllers/employee.server.controller');
module.exports = (app) => {

    app.route('/employees').post(employees.create).get(employees.employeesList);
    app.route('/employees/:employeeId').get(employees.read);
    app.param('employeeId', employees.employeeByID);

};
