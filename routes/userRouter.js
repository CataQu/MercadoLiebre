// controller
const controller = require('../controllers/userController');

const express = require('express');
const router = express.Router();
const path = require('path');

// express-validator setup
const { body } = require('express-validator');
const validations = [
        body('name').notEmpty().withMessage('Debes ingresar tu nombre completo'),
        body('user').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
        body('dob').notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),
        body('address').notEmpty().withMessage('Debes ingresar tu domicilio real'),

        body('email').notEmpty().withMessage('Debes ingresar un correo electronico').bail()
        .isEmail().withMessage('Ingresa un formato de email correcto').bail()
        .normalizeEmail(),

        body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña debe contener al menos un numero, una mayuscula y un simbolo'),

        body('perfil').notEmpty().withMessage('Selecciona tu perfil de comprador o vendedor'),
        body('categories').notEmpty().withMessage('Selecciona una categoria de interes'),
        body('avatar').custom(value => {

            throw new Error('Debes subir una imagen de perfil valida con extension ')
        })
];

// multer setup
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve(__dirname, '../public/img/avatar'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = 'avatar-' + Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage })


router.get('/register', upload.single('avatar'), validations, controller.register);
router.post('/register', upload.single('avatar'), validations, controller.postRegister)

router.get('/login', controller.login);

module.exports = router;