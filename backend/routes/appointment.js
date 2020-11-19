const express = require('express');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.addNewUser);

module.exports = router;
