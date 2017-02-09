/**
 * Created by nsm1211 on 2/9/17.
 */

const Employee = require('mongoose').model('Employee');

exports.create = function (req, res, next) {

    const employee = new Employee(req.body);
    employee.save((err) => {
        if (err) {
            return next(req);
        } else {
            return res.status(200).json(employee);
        }
    });
};
