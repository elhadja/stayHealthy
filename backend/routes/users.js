const express = require('express');
const usersControllers = require('../controllers/users');
const auth = require('../middlewares/auth')

const router = express.Router();

router.post('/new', usersControllers.addNewUser);
router.post('/login', usersControllers.logsUser); 
router.delete('/:id', usersControllers.deleteUser);

module.exports = router;
