/**
 * Created by nsm1211 on 2/9/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    userName: String,
    password: String,
    userName: {
        type: String,
        trim: true
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
    }
});

EmployeeSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});

EmployeeSchema.set('toJSON', {getters: true, virtuals: true});


mongoose.model('Employee', EmployeeSchema);