const path = require('path');
const fs = require('fs');

const productsArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf8'))

const controlador = {
    home: (req, res) =>{
        const id = req.params.id;
        res.render('home.ejs', {
            id: id,
            productsArray: productsArray
        });
    }
}

module.exports = controlador;