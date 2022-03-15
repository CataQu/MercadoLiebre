const path = require('path');
const fs = require('fs');
const {
    Product,
    Brand,
    Category
} = require('../database/models');

const productsFilePath = path.resolve(__dirname, '../data/products.json');
const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'))

const controller = {
    create: async function (req, res) {
        const brands = await Brand.findAll();
        const categories = await Category.findAll();
        res.render('products/create', {
            brands,
            categories
        })
    },
    post: async function (req, res) {
        let productToCreate = {
            ...req.body,
            image: req.file.filename,
            brandId: req.body.brands,
            categoryId: req.body.categories
        }
        try {
            let productCreated = await Product.create(productToCreate);
            //    productCreated.addCategories(req.body.categories)
            //    productCreated.addBrands(req.body.brands)

            return res.redirect('products/list')

        } catch (error) {
            console.log(error)
        }
    },
    list: async (req, res) => {
        try {
            const brands = await Brand.findAll();
            const categories = await Category.findAll();
            const product = await Product.findAll({
                include: ["brands", "categories"]
            })
            return res.render('products/list', {
                loggedUser: req.session.loggedUser,
                product,
                brands,
                categories
            })
        } catch (error) {
            console.log(error)
        }
    },
    detail: async function (req, res) {
        try {
            const id = Number(req.params.id);
            const oneProduct = await Product.findByPk(id, {
                include: ["brands", "categories"]
            });
            res.render('products/detail', {
                id: id,
                oneProduct: oneProduct,
                loggedUser: req.session.loggedUser
            })
        } catch (error) {
            console.log(error)
        }
    },
    edit: async function (req, res) {
        try {
            const id = Number(req.params.id);
            const brands = await Brand.findAll();
            const categories = await Category.findAll();
            const oneProduct = await Product.findOne({
                where: {
                    productId: id
                }
            });
            res.render('products/edit', {
                categories,
                brands,
                id: id,
                oneProduct: oneProduct,
                loggedUser: req.session.loggedUser
            })
        } catch (error) {
            console.log(error)
        }
    },
    update: async function (req, res) {
        try {
            await Product.update({
                ...req.body,
                image: req.file.filename,
                brandId: req.body.brands,
                categoryId: req.body.categories
            }, {
                where: {
                    productId: req.params.id
                }
            });

            return res.redirect('/products/list')

        } catch (error) {
            console.log(error)
        }
    },
    delete: async function (req, res) {
        const productId = req.params.id;
        const productToDelete = await Product.destroy({
            where: {
                productId: productId
            }
        })

        return res.redirect('/products/list')
    }
}


module.exports = controller;