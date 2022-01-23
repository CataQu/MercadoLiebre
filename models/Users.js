// 1- guardar al usuarrio en DB
// 2- buscar un usuario que se quiere loguear por email
// 3- buscar a un usuario por otra pk
// 3 1/2 - buscar a todos los usuarios 
// 4- editar la info del usuario
// 5- eliminar a un usuario
const fs = require('fs');

const User = {
    fileName: './data/users.json',

    getData: function (){
            return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    findAll: function (){
        return this.getData();
    },

    generateID: function (){
            var allUsers = this.getData();
            var lastUser = allUsers.pop();
            if (lastUser) {
        return lastUser.id + 1;
            }
            return 1
    },

    findByPk: function (id){
        let allUsers = this.findAll();
        let foundUser = allUsers.find(oneUser => oneUser.id == id)
            return foundUser
    },

    findByEmail: function (email){
        let allUsers = this.findAll();
        let foundUserByEmail = allUsers.find(oneUser => oneUser.email == email)
        return foundUserByEmail
    },

    findByField: function (field, text){
        let allUsers = this.findAll();
        let foundByFieldUser = allUsers.find(oneUser => oneUser[field] == text)
        return foundByFieldUser
    },

    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateID(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
    return newUser
    },

    delete: function (id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id != id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
        return true
    }

}

module.exports = User