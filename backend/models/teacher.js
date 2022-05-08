const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherRegSchema = new Schema({
    teacherName: {
        type: String,
        required: true,
    },

    teacherId: {
        type: String,
        required: true,
    },

    teacherTel: {
        type: String,
        required: true,
    },

    teacherEmail:{
        type: String,
        required: true,
    },

    teacherGrade:{
        type: String,
        required: true
    },

    teacherCenter:{
        type: String,
        required: true,
    },

    teacherSubject:{
        type: String,
        required: true,
    },

    classType:{
        type: String,
        required: true,
    },
    
    classOrganization:{
        type: String,
        required: true,
    },

    timeStamp:{
        type: String,
        required: true,
    },
});
const teacher_regSchema = mongoose.model('teacher', teacherRegSchema);
module.exports = teacher_regSchema;