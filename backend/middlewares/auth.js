const jwt = require("jsonwebtoken");

exports.doctorAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const isUserIdCorrect = req.params.id ? (req.params.id===decodedToken.userId) : true;
        if (!isUserIdCorrect)
            throw "Invalid user Id. The user Id parameter must match token owner";
        else if (decodedToken.scope !== "doctors") {
            throw "access allowed for doctors only";
        } else {
            req.userId = decodedToken.userId;
            next();
        }
    } catch (err) {
        console.log("JWT error: ", err);
        res.status(401).json({err: err});
    }
};

exports.patientAuth = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const isUserIdCorrect = req.params.id ? (req.params.id===decodedToken.userId) : true;
        if (!isUserIdCorrect)
            throw "Invalid user Id. The user Id parameter must match token owner";
        if (decodedToken.scope !== "patients") {
            throw "access allowed for patients only:" + decodedToken.scope;
        } else {
            req.userId = decodedToken.userId;
            next();
        }
    } catch (err) {
        console.log("JWT error: ", err);
        res.status(401).json({err: err});
    }
};

exports.userAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        console.log("JWT error: ", err);
        res.status(401).json({err: err});
    }
};