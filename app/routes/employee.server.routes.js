/**
 * Created by nsm1211 on 2/9/17.
 */

const employees = require('../controllers/employee.server.controller');
module.exports = (app) => {

    app.route('/employees').get(employees.employeesList).post(employees.create);
    app.route('/employees/:employeeId').get(employees.read).put(employees.updateEmployee).delete(employees.delete);
    app.param('employeeId', employees.employeeById);

};
