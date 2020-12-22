const jwt = require("jsonwebtoken");

exports.doctorAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        if (decodedToken.scope !== "doctors") {
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