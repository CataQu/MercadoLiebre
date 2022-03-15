const { body } = require('express-validator');
const path = require('path');
const validations = [
        body('firstName').notEmpty().withMessage('Debes ingresar tu nombre completo'),
        body('lastName').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
        // body('dob').notEmpty().withMessage('Debes ingresar tu fecha de nacimiento'),
        // body('address').notEmpty().withMessage('Debes ingresar tu domicilio real'),
        body('email').notEmpty().withMessage('Debes ingresar un correo electronico').bail()
        .isEmail().withMessage('Ingresa un formato de email correcto').bail()
        .normalizeEmail(),

        body('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña debe contener al menos un numero, una mayuscula y un simbolo'),

        // body('perfil').notEmpty().withMessage('Selecciona tu perfil de comprador o vendedor'),
        // body('categories').notEmpty().withMessage('Selecciona una categoria de interes'),
        body('avatar').custom((value, {req})=> {
            let file = req.file;
            let acceptedExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
            if (!file){
                throw new Error('Debes subir una imagen de perfil')
            } else {
                let fileExtension = path.extname(file.originalname);
            if (file && !acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo aceptadas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
        }).bail()
];

module.exports = validations