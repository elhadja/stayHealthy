const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patientSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tel: { type: String },
    adress: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Patient", patientSchema);