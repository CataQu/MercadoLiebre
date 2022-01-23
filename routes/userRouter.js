// controller
const controller = require('../controllers/userController');

const express = require('express');
const router = express.Router();
const path = require('path');

const upload = require('../middlewares/userMulterMiddleware');


const validations = require('../middlewares/userValidationMiddleware')



router.get('/register', upload.single('avatar'), validations, controller.register);
router.post('/', upload.single('avatar'), validations, controller.postRegister)

router.get('/login', controller.login);
router.post('/login', controller.processLogin)

router.get('/profile', controller.profile)

module.exports = router;