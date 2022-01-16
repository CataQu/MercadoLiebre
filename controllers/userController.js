const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

const usersFilePath = path.resolve(__dirname, '../data/users.json');
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

 const controller = {
    register: (req, res) =>{
        res.render('./users/register')
    }, 
    postRegister: (req, res) =>{
        const resultValidation = validationResult(req)

        if (resultValidation.errors.isEmpty()) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
            })
        }

        var generateID = () => {
        	if(usersArray.length >= 1){
		        generateID = () => {
			const lastUser =  productsArray[usersArray.length - 1];
			const lastID = lastUser.id;
			return lastID + 1;
		}
    } else {
        generateID = () => {
            return 1
        }
    }
    };
    usersArray.push(
        {
        id: generateID(),
        name: req.body.name,
        user: req.body.user,
        dob: req.body.dob,
        address: req.body.address,
        password: req.body.password,
        perfil: req.body.perfil,
        categories: req.body.categories,
        avatar: 'img/avatar/' + req.file.filename
        });
        fs.writeFileSync(usersFilePath, JSON.stringify(usersArray), 'utf8');
        return res.send('usuario creado con exito')
    },

    login: (req, res) =>{
        res.render('./users/login.ejs')
    }
 }


module.exports = controller;