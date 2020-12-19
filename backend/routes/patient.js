const express = require("express");
const usersControllers = require("../controllers/patient");

const router = express.Router();

router.post("/", usersControllers.addNewUser);
router.post("/login", usersControllers.logsUser); 
router.delete("/:id", usersControllers.deleteUser);
router.get("/:id", usersControllers.getPatientById);
router.put("/:id", usersControllers.updatePatient);

module.exports = router;
