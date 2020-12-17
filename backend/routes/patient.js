const express = require("express");
const usersControllers = require("../controllers/patient");

const router = express.Router();

router.post("/", usersControllers.addNewUser);
router.post("/login", usersControllers.logsUser); 
router.delete("/:id", usersControllers.deleteUser);
router.get("/", (req, res) => res.status(200).send("ok"));

module.exports = router;
