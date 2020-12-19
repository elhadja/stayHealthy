const express = require("express");
const slotController = require("../controllers/slot");

const router = express.Router();

router.post("/", slotController.addSlot);
router.put("/:id", slotController.updateSlot);

module.exports = router;
