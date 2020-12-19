const express = require("express");
const slotController = require("../controllers/slot");

const router = express.Router();

router.post("/", slotController.addSlot);

module.exports = router;
