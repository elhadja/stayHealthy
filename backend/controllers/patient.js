const { response } = require('express');
const db = require('../db');
const patient = require('../models/patient');

exports.addNewUser = (req, res) => {
    db.addUser(req.body).then((response) => {
        res.status(201).json(response);
    }).catch(error => {
        res.status(400).json({error: error});
    });
}

exports.logsUser = (req, res) => {
    db.logsUser(req.body.email, req.body.password)
        .then(response => {
            res.json(response);
        })
        .catch(error => res.json(error));
}

exports.deleteUser = (req, res) => {
    patient.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({ message: "user deleted !"});
    })
    .catch(error => res.status(404).json({ error: error.message }));

}