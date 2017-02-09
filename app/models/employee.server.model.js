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
    password: String
});


mongoose.model('Employee', EmployeeSchema);