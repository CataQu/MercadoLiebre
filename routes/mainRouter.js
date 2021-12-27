const express = require('express');

const router = express.Router();

const controller = require('../controllers/mainController.js');

router.get('/', controller.home);

module.exports = router;