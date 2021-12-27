const path = require('path');

var productos = [
    {
        name: 'Cafetera Moulinex',
        img: '/img/img-cafetera-moulinex.jpg',
        description: 'Cafetera Moulinex',
        discount: '40% off',
        price: '$6.770'
    },
    {
        name: 'MacBook Pro 2019',
        img: '/img/img-macbook-pro-2019.jpg',
        description: 'MacBook Pro 2019',
        discount: '20% off',
        price: '$230.000'
    },
    {
        name: 'Samsung Galaxy S10',
        img: '/img/img-samsung-galaxy-s10.jpg',
        description: 'Samsung Galaxy S10',
        discount: '10% off',
        price: '$70.500'
    },
    {
        name: 'SmartTV Samsung 43"',
        img: '/img/img-tv-samsung-smart.jpg',
        description: 'SmartTV Samsung 43"',
        discount: '5% off',
        price: '$23.200'
    }
]


const controlador = {
    home: (req, res) =>{
        res.render('home.ejs', {productos: productos});
    },
    register: (req, res) =>{
        res.render('./users/register.ejs')
    }, 
    login: (req, res) =>{
        res.render('./users/login.ejs')
    }
}

module.exports = controlador;