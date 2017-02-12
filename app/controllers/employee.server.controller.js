/**
 * Created by nsm1211 on 2/9/17.
 */

const Employee = require('mongoose').model('Employee');
const passport = require('passport');


exports.renderSignup = function (req, res, next) {
    if (!req.employee) {
        res.render('signup',
            {
                title: 'Sign up',
                messages: req.flash('error')
            }
        )
    } else {
        return res.redirect('/')
    }
};

exports.renderSignin = function (req, res, next) {
    if (!req.employee) {
        res.render('signin',
            {
                title: 'Sign in',
                messages: req.flash('error') || req.flash('info')
            }
        )
    } else {
        return res.redirect('/')
    }
};

exports.signup = function (req, res, next) {
    if (!req.employee) {
        const employee = new Employee(req.body);
        employee.provider = 'local';

        employee.save((err) => {
            if (err) {
                req.flash('error', getErrorMessage(err));
                return res.redirect('/signup')
            }
            req.login(employee, (err) => {
                if (err) {
                    return next(err)
                }
                return res.redirect('/')
            })
        })
    } else {
        return res.redirect('/')
    }
};

function getErrorMessage(err) {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'employee already exists';
                break;
            default:
                message = 'something went wrong';
        }
    } else {
        for (errName of  err.errors) {
            if (err.errors[errName].message) {
                message = err.error[errName].message
            }
        }
    }
    return message
}

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/')
};

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

exports.employeeById = function (req, res, next, id) {

    Employee.findOne({_id: id}, (err, employee) => {
        if (err) {
            next(req);
        } else {
            req.employee = employee;
            next();
        }
    })
};

exports.updateEmployee = function (req, res, next) {
    Employee.findByIdAndUpdate(req.employee.id, req.body, {'new': true}, (err, employee) => {
        if (err) {
            next(req);
        } else {
            res.status(200).json(employee);
        }
    })
};

exports.delete = function (req, res, next) {
    req.employee.remove({safe: true}, (err) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(req.employee);
        }
    })
};

