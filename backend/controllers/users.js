const { response } = require('express');
const db = require('../db');

exports.addNewUser = (req, res) => {
    db.addUser(req.body).then((response) => {
        res.status(201).json(response);
    }).catch(error => {
        res.send(error);
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
    res.send('delete new');
}