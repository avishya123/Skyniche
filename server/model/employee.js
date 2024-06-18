const mongoose = require('mongoose')

const empschema = new mongoose.Schema({
    empnumber:String,
    image:String,
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    designation: String,
    date: Date,
    salary: Number,
})
const empmodel = mongoose.model('employee',empschema)
module.exports = empmodel;