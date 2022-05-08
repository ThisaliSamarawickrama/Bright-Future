const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const class_schema = new Schema({
    subject: {
        type: String,
        required: true,
    },

    teacherName: {
        type: String,
        required: true,
    },

    grade: {
        type: String,
        required: true,
    },

    day:{
        type: String,
        required: true,
    },

    timeStamp:{
        type: String,
        required: true,
    },   
    
    classDuration:{
        type: String,
        required: true,
    },
});
const class_reg_schema = mongoose.model('class', class_schema);
module.exports = class_reg_schema;