const express = require("express");
const usersControllers = require("../controllers/doctor");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", usersControllers.addNewUser);
router.post("/login", usersControllers.logsUser); 
router.delete("/:id", usersControllers.deleteUser);
router.get("/:id", usersControllers.getDoctorById);
router.get("/", usersControllers.getDoctorsBy);
router.put("/:id", usersControllers.updateDoctor);
router.get("/test", auth, (req, res) => {
    res.json({message: "test ok"});
});

module.exports = router;
