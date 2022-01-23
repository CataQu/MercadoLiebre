const path = require('path');
const fs = require('fs');

const productsFilePath = path.resolve(__dirname, '../data/products.json');
const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'))

const controller = {
    list: function (req, res) {
        // res.send('este es el list')
        res.render('products/list', {
            productsArray: productsArray,
            loggedUser: req.session.loggedUser})
    },
    detail: function (req, res) {
        const id = Number(req.params.id);
        const oneProduct = productsArray.find(oneProduct => oneProduct.id === id);
        res.render('products/detail', { 
            id: id,
            oneProduct: oneProduct,
            loggedUser: req.session.loggedUser
        })
    },
    create: function (req, res) {
        res.render('products/create')
    },
    post: function (req, res) {
        var generateID = () => {
            return 1
        }
        	if(productsArray.length >= 1){
		generateID = () => {
			// 1. Obtenemos el último producto almacenado en la DB
			const lastProduct =  productsArray[productsArray.length - 1];
			// 2. Obtenemos el ID de ese último producto
			const lastID = lastProduct.id;
			// 3. Retornamos ese último ID incrementado en 1
			return lastID + 1;
		}
    } else {
        generateID = () => {
            return 1
        }
    };
        productsArray.push({
            id: generateID(),
            name: req.body.name,
            img: 'img/' + req.file.filename,
            description: req.body.description,
            discount: req.body.discount,
            price: req.body.price
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, ' '));

        return res.redirect('products/list')
    },
    edit: function (req, res) {
        const id = Number(req.params.id);
        const oneProduct = productsArray.find(oneProduct => oneProduct.id === id);
        res.render('products/edit', { 
            id: id,
            oneProduct: oneProduct,
            loggedUser: req.session.loggedUser
        })
    },
    put: function (req, res) {
        res.redirect('products/list')
    },
    delete: function (req, res) {
        const id = Number(req.params.id);
        const filteredProducts = productsArray.filter(oneProduct => oneProduct.id !== id);

        fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, ' '));
        res.redirect('products/list')
    }
}


module.exports = controller;