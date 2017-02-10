/**
 * Created by nsm1211 on 2/9/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: {
        type: String,
        unique: true
    },
    userName: String,
    password: {
        type: String,
        validate: [
            function (password) {
                return password.length >= 2
            },
            'password should be greater then 2 char'
        ]
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    }
});

EmployeeSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});

EmployeeSchema.set('toJSON', {getters: true, virtuals: true});


mongoose.model('Employee', EmployeeSchema);