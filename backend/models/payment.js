const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const card_payment_student = new Schema({
    cardName: {
        type: String,
        required: true,
    },

    cardNumber: {
        type: String,
        required: true,
    },

    studentID: {
        type: String,
        required: true,
    },

    Holder:{
        type: String,
        required: true,
    },

    cvv:{
        type: String,
        required: true
    },

    amount:{
        type: String,
        required: true,
    },

    expireDate:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    grade:{
        type: String,
        required: true,
    },

    month:{
        type: String,
        required: true,
    },


    
});
const card_payment_studentSchema = mongoose.model('card_payment_student', card_payment_student);
module.exports = card_payment_studentSchema;