const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const slotSchema = mongoose.Schema({
    date: {type: {
        jj: { type: Number, required: true},
        mm: { type: Number, required: true},
        yy: { type: Number, required: true},
    }, required: true},
    startHour: { type: {
        hh: Number,
        mn: Number,
    }, required: true},
    doctorId: { type: ObjectId, required: true },
    patientId: ObjectId
});

slotSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Slot", slotSchema);