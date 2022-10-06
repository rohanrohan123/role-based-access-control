const mongoose = require('mongoose');

const { roles } = require('../utils/constants');


const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    phone: {
        type: Number,
        required: true,

    },
    address: {
        type: String,
        required: true,

    },
    status: {
        type: String,
         enum: [roles.statuspending,roles.statusapproved],
        default: roles.statuspending,
    },


},
    { timestamps: true }
);
const Form = mongoose.model('form', FormSchema);


module.exports = Form;