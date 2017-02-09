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

exports.employeesList = function (req, res, next) {

    Employee.find({}, (err, employees) => {
        if (err) {
            return next(req);
        } else {
            res.status(200).json(employees);
        }

    });
};

exports.read = function (req, res) {
    res.json(req.employee);
};

exports.employeeByID = function (req, res, next, id) {

    Employee.findOne({_id: id}, (err, employee) => {
        if (err) {
            next(req);
        } else {
            res.status(200).json(employee);
        }
    })
};

