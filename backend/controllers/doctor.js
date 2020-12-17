const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Doctor = require('../models/doctor');

exports.addNewUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            req.body.password = hash;
            const doctor = new Doctor({...req.body});
            doctor.save()
                .then(() => res.status(201).json({message: 'doctor created !'}))
                .catch(error => {
                   res.json({error});
                });
        })
        .catch(error => {
            res.json(error);
        });
}

exports.logsUser = (req, res) => {
    Doctor.findOne({email: req.body.email})
    .then(patient=> {
        if (!patient)
            res.status(400).json({ message: 'doctor not found' });
        bcrypt.compare(req.body.password, patient.password)
            .then(valid => {
                if (!valid)
                    res.json({ message: 'incorrect password' });
                res.json({
                    id: patient._id,
                    token: jwt.sign(
                        { userId: patient._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(err => {
                res.json(err)
            });
    })
    .catch(err => res.json({err}));
}

exports.deleteUser = (req, res) => {
    res.send('delete new');
}