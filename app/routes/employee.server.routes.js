/**
 * Created by nsm1211 on 2/9/17.
 */

const users = require('../controllers/employee.server.controller');
module.exports = (app) => {

    app.route('/users').post(users.create);

};
