/**
 * Created by nsm1211 on 2/9/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password.length >= 2
            },
            'password should be greater then 2 char'
        ]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    website: {
        type: String,
        set: (url) => {
            if (!url) {
                return url
            } else {
                if (url.indexOf('https') !== 0 && url.indexOf('http') !== 0) {
                    url = 'http"//' + url
                }
            }
            return url
        },
        get: (url) => {
            if (!url) {
                return url
            } else {
                if (url.indexOf('https') !== 0 && url.indexOf('http') !== 0) {
                    url = 'http://' + url
                }
            }
            return url
        }
    },
    // role: {
    //     type: String,
    //     enum: ['Admin', 'Owner', 'User']
    // },
    salt: {
        type: String
    },
    provider: {
        type: String,
        require: 'Provider is required'
    },
    providerId: String,
    providerData: {}
});

EmployeeSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});

EmployeeSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password)
    }
    next()
});

EmployeeSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64')
};

EmployeeSchema.methods.authenticate = function (password) {
    return this.password = this.hashPassword(password)
};

EmployeeSchema.static.findUniqueUsername = function (username, suffix, callback) {
    const possibleUsername = username + (suffix || '');

    this.findOne({username: possibleUsername}, (err, employee) => {
        if (!err) {
            if (!employee) {
                callback(possibleUsername)
            } else {
                this.findUniqueUsername(username, (suffix || 0) + 1, callback)
            }
        } else {
            callback
        }
    })
};

EmployeeSchema.post('save', function (next) {
    console.log('employee with ' + this.firstName + " got saved");
});

EmployeeSchema.set('toJSON', {getters: true, virtuals: true});


mongoose.model('Employee', EmployeeSchema);