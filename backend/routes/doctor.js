const express = require("express");
const usersControllers = require("../controllers/doctor");

const router = express.Router();

router.post("/", usersControllers.addNewUser);
router.post("/login", usersControllers.logsUser); 
router.delete("/:id", usersControllers.deleteUser);
router.get("/:id", usersControllers.getDoctorById);
router.get("/", usersControllers.getDoctorsBy);
router.put("/:id", usersControllers.updateDoctor);

module.exports = router;
