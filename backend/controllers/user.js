const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.deleteUser = (req, res, UserModel) => {
    UserModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "user deleted !"});
        })
        .catch(error => res.status(404).json({ error: error.message }));
};

exports.signin = (req, res, UserModel) => {
    UserModel.findOne({email: req.body.email})
        .then(user=> {
            if (!user)
                res.status(400).json({ message: "user not found" });
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid)
                            res.status(400).json({ message: "incorrect password" });
                        else {
                            res.status(200).json({
                                id: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    "RANDOM_TOKEN_SECRET",
                                    { expiresIn: "24h" }
                                )
                            });
                        }
                    })
                    .catch(err => {
                        res.json(err);
                    });
            }
        })
        .catch(err => res.json({err}));
};

exports.signup = (req, res, UserModel) => {
    if (!req.body.password)
        res.status(400).json({error: "password field is required"});
    else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                req.body.password = hash;
                const user = new UserModel({...req.body});
                user.save()
                    .then((savedUser) => res.status(201).json({
                        message: "user created", id: savedUser._id
                    }))
                    .catch(error => {
                        res.status(400).json({error: error});
                    });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }
};