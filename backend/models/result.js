const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({

    studentId: {
        type: String,
        required: true,
    },

    subjectCode: {
        type: String,
        required: true,
    },

    subject:{
        type: String,
        required: true,
    },

    result:{
        type: String,
        required: true
    },

    timeStamp:{
        type: String,
        required: true,
    },
});
const result_regSchema = mongoose.model('results', resultSchema);
module.exports = result_regSchema;