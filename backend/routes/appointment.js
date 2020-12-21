const express = require("express");
const slotController = require("../controllers/slot");

const router = express.Router();

router.get("/:id", slotController.getAppointmentById);
router.post("/:patientId/:slotId", slotController.addAppointment);
router.put("/:id", slotController.cancelAppointment);
router.get("/patient/:idPatient", slotController.getPatientAppointment);
router.get("/doctor/:idDoctor", slotController.getDoctorAppointments);

module.exports = router;
