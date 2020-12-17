const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/doctor");

exports.addNewUser = (req, res) => {
    if (!req.body.password)
        res.status(400).json({error: "password field is required"});
    else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                req.body.password = hash;
                const doctor = new Doctor({...req.body});
                console.log(doctor);
                doctor.save()
                    .then((doctor) => res.status(201).json({ message: "doctor created", id: doctor._id}))
                    .catch(error => {
                        console.log(error);
                        res.status(400).json({error: error});
                    });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }
};

exports.logsUser = (req, res) => {
    Doctor.findOne({email: req.body.email})
        .then(patient=> {
            if (!patient)
                res.status(400).json({ message: "doctor not found" });
            bcrypt.compare(req.body.password, patient.password)
                .then(valid => {
                    if (!valid)
                        res.status(400).json({ message: "incorrect password" });
                    res.status(200).json({
                        id: patient._id,
                        token: jwt.sign(
                            { userId: patient._id },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(err => {
                    res.json(err);
                });
        })
        .catch(err => res.json({err}));
};

exports.deleteUser = (req, res) => {
    Doctor.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "user deleted !"});
        })
        .catch(error => res.status(404).json({ error: error.message }));
};