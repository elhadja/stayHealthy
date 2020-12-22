const express = require("express");
const slotController = require("../controllers/slot");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth.doctorAuth, slotController.addSlot);
router.put("/:id", auth.doctorAuth, slotController.updateSlot);
router.delete("/:id", auth.doctorAuth, slotController.deleteSlot);
router.get("/:id", auth.doctorAuth, slotController.getSlotById);
router.get("/", auth.doctorAuth, slotController.getSlotsBy);

module.exports = router;
