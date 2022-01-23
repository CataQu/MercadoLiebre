const path = require('path');
const fs = require('fs');
const {
    validationResult
} = require('express-validator');
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.resolve(__dirname, '../data/users.json');
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {
    register: (req, res) => {
        res.render('./users/register')
    },
    postRegister: (req, res) => {
        var resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        let isUserInDB = User.findByEmail(req.body.email);

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
            avatar: 'img/avatar/' + req.file.filename
        }

        User.create(userToCreate)
        return res.redirect('/user/login')
    },

    login: (req, res) => {
        res.render('./users/login.ejs')
    },
    processLogin: (req, res) => {
        let userLogging = User.findByEmail(req.body.email)
        console.log(userLogging.password);
       if (userLogging){
          if (bcryptjs.compareSync(req.body.password, userLogging.password)){
              req.session.loggedUser = userLogging;
              if (req.body.rememberUser){
                res.cookie('userEmail', req.body.email, {maxAge: 1000 * 60})
            }
             return  res.redirect('/user/profile')
          } return res.send('las credenciales son invalidas')

       } return res.send('el email no existe')
        
    },
    profile: (req, res) => {
        // console.log(req.cookies.userEmail);
        res.render('./users/profile', {
            loggedUser: req.session.loggedUser
        })
        console.log(req.session)
    }
}


module.exports = controller;