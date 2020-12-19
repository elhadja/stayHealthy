const express = require("express");
const slotController = require("../controllers/slot");

const router = express.Router();

router.post("/", slotController.addSlot);
router.put("/:id", slotController.updateSlot);
router.delete("/:id", slotController.deleteSlot);
router.get("/:id", slotController.getSlotById);
router.get("/", slotController.getSlotsBy);

module.exports = router;
