// controller
const controller = require('../controllers/userController');

const express = require('express');
const router = express.Router();
const path = require('path');

// Middlewares 
const upload = require('../middlewares/userMulterMiddleware');
const validations = require('../middlewares/userValidationMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/register', upload.single('avatar'), validations, controller.register);
router.post('/', upload.single('avatar'), validations, controller.postRegister)

router.get('/login', controller.login);
router.post('/login', controller.processLogin)

router.get('/profile', controller.profile)

router.get('/logout', controller.logout)

module.exports = router;