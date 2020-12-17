const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Patient = require("./models/patient");

const dbName = "stayHealthy";
const uri = "mongodb+srv://elhadjium:270795mongo@cluster0.u6wuq.mongodb.net/" + dbName + "?retryWrites=true&w=majority";

exports.init = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("mongodb reached !"))
        .catch(() => console.log("error when attempting to connect to mongodb"));

};


exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
                const patient = new Patient({...user});
                patient.save()
                    .then((mongoRes) => resolve({message: "patient created !", id: mongoRes._id }))
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

exports.logsUser = (email, password) => {
    return new Promise((resolve, reject) => {
        if (!email || !password)
            reject("password and email can't be null");

        Patient.findOne({email: email})
            .then(res => {
                if (!res)
                    reject("patient not found !");
                bcrypt.compare(password, res.password)
                    .then(valid => {
                        if (!valid)
                            reject("incorrect password");
                        resolve({
                            id: res._id,
                            token: jwt.sign(
                                { userId: res._id },
                                "RANDOM_TOKEN_SECRET",
                                { expiresIn: "24h" }
                            )
                        });
                    })
                    .catch(() => reject("hehe"));

            })
            .catch(() => reject("hehe"));
    });
};