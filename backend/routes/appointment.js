const express = require("express");
const slotController = require("../controllers/slot");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", auth.userAuth, slotController.getAppointmentById);
router.post("/:patientId/:slotId", auth.patientAuth, slotController.addAppointment);
router.put("/:id" , auth.userAuth, slotController.cancelAppointment);
router.get("/patient/:patientId", auth.patientAuth, slotController.getPatientAppointment);
router.get("/doctor/:idDoctor", auth.doctorAuth, slotController.getDoctorAppointments);

module.exports = router;
