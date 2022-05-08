const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentRegSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    studentId: {
        type: String,
        required: true,
        unique: true,
    },

    studentAddress: {
        type: String,
        required: true,
    },

    contactNumber:{
        type: String,
        required: true,
    },

    grade:{
        type: String,
        required: true
    },

    parentContactNumber:{
        type: String,
        required: true,
    },

    timeStamp:{
        type: String,
        required: true,
    },
});
const student_regSchema = mongoose.model('student', studentRegSchema);
module.exports = student_regSchema;