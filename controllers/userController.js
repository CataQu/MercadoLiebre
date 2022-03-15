const path = require('path');
const fs = require('fs');
const {
    validationResult
} = require('express-validator');
const {
    User
} = require('../database/models')
const bcryptjs = require('bcryptjs');


const controller = {
    register: (req, res) => {
        res.render('./users/register', {
            loggedUser: req.session.loggedUser
        })
    },
    postRegister: async (req, res) => {
        var resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let isUserInDB = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (isUserInDB) {
            return res.render('./users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        try {
            await User.create(userToCreate)
            return res.redirect('/user/login')

        } catch (error) {
            console.log(error)
        }
    },

    login: (req, res) => {
        res.render('./users/login.ejs', {
            loggedUser: req.session.loggedUser
        })
    },
    processLogin: async (req, res) => {
        let userLogging = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userLogging) {
            if (bcryptjs.compareSync(req.body.password, userLogging.password)) {
                req.session.loggedUser = userLogging;
                if (req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email, {
                        maxAge: (1000 * 60) * 60
                    })
                }
                return res.redirect('/user/profile')
            }
            let loginError = 'Las credenciales son invalidas'
            return res.render('./users/login', {
                loginError: loginError
            })

        }
        return res.send('el email no existe')
    },
    profile: (req, res) => {
        // console.log(req.cookies.userEmail);
        res.render('./users/profile', {
            loggedUser: req.session.loggedUser
        })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}


module.exports = controller;