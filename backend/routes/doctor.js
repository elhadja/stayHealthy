const express = require("express");
const usersControllers = require("../controllers/doctor");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", usersControllers.addNewUser);
router.post("/login", usersControllers.logsUser); 
router.delete("/:id", auth.doctorAuth, usersControllers.deleteUser);
router.get("/:id", auth.doctorAuth, usersControllers.getDoctorById);
router.get("/",  auth.doctorAuth, usersControllers.getDoctorsBy);
router.put("/:id", auth.doctorAuth, usersControllers.updateDoctor);

module.exports = router;
