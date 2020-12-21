const Slot = require("../models/slot");
const Doctor = require("../models/doctor");

exports.addSlot = (req, res) => {

    Doctor.findById(req.body.doctorId)
        .then((doctor) => {
            if (doctor) {
                const slot = new Slot(req.body);
                slot.save()
                    .then(savedSlot => {
                        res.status(201).json({message: "slot added", slot: savedSlot});
                    })
                    .catch(error => {
                        res.status(400).json(error);
                    });
            } else
                res.status(400).json({error: "doctorId must be valid"});
        })
        .catch(error => {
            res.status(400).json({error: error, message: "heh"});
        });

};

exports.updateSlot = (req, res) => {
    Slot.findOneAndUpdate(
        { _id: req.params.id, patientId: {$exists: false }},
        {...req.body, _id: req.params.id },
        {useFindAndModify: false, new: true}
    )
        .then(mongoRes => {
            if (mongoRes)
                res.status(200).json({message: "slot modified", slot: mongoRes});
            else
                res.status(400).json({error: "slot not found or occupied by à patient"});
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.deleteSlot = (req, res) => {
    Slot.deleteOne({ _id: req.params.id, patientId: {$exists: false }})
        .then((response) => {
            if (response.deletedCount === 1) 
                res.status(200).json({ message: "slot deleted !", response: response});
            else
                res.status(404).json({ error: "slot not found or occupied by a patient", response: response });
        })
        .catch(error => res.status(404).json({ error: error.message }));

};

exports.getSlotById = (req, res) => {
    Slot.findOne({ _id: req.params.id })
        .then(slot => {
            if (slot) {
                res.status(200).json(slot);
            } else {
                res.status(404).json({error: "slot not found"});
            }
        })
        .catch(error => res.status(500).json(error));

};

exports.getSlotsBy = (req, res) => {
    let idFilter = req.query.id ? req.query.id : "";
    
    Slot.find({ doctorId: idFilter })
        .then(slots => {
            res.status(200).json(slots);
        })
        .catch(error => res.status(500).json(error));
};


exports.getAppointmentById = (req, res) => {
    res.send("get by id");
};

exports.addAppointment = (req, res) => {
    Slot.findOneAndUpdate(
        { _id: req.params.slotId, patientId: { $exists: false }},
        { patientId: req.params.patientId },
        {useFindAndModify: false, new: true}
    )
        .then(mongoRes => {
            if (mongoRes)
                res.status(200).json({message: "appointment created", slot: mongoRes});
            else
                res.status(400).json({error: "slot not found or occupied by à patient"});
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.cancelAppointment = (req, res) => {
    Slot.findOneAndUpdate(
        { _id: req.params.id},
        { $unset: {patientId: ""} },
        {useFindAndModify: false, new: true}
    )
        .then(mongoRes => {
            if (mongoRes)
                res.status(200).json({message: "appointment canceled", slot: mongoRes});
            else
                res.status(400).json({error: "slot not found"});
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getDoctorAppointments = (req, res) => {
    Slot.find({ doctorId: req.params.idDoctor, patientId: {$exists: true} })
        .then(slots => {
            res.status(200).json(slots);
        })
        .catch(error => res.status(500).json(error));

};


exports.getPatientAppointment = (req, res) => {
    Slot.find({ patientId: req.params.patientId })
        .then(slots => {
            console.log(req.params.patientId);
            res.status(200).json(slots);
        })
        .catch(error => res.status(500).json(error));

};