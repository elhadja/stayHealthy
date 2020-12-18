const Doctor = require("../models/doctor");
const user = require("./user");

exports.addNewUser = (req, res) => {
    user.signup(req, res, Doctor);
};

exports.logsUser = (req, res) => {
    user.signin(req, res, Doctor);
};

exports.deleteUser = (req, res) => {
    user.deleteUser(req, res, Doctor);
};