const express = require('express');

const router = express.Router();

const controller = require('../controllers/mainController.js');

router.get('/register', controller.register);

router.get('/login', controller.login);

module.exports = router;