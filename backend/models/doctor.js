const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const doctorSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tel: { type: String },
    adress: { type: String },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    speciality: { type: String},
    meansOfPayment: { type: [String] },
    diplomas: { type: [String] }
});

doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctor', doctorSchema);