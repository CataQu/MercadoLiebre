const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const path = require('path');

const upload = require('../middlewares/productMulterMiddleware')

router.get('/list', controller.list);

router.get('/detail/:id?', controller.detail);

router.get('/create', controller.create);
router.post('/', upload.single('img'), controller.post);

router.get('/edit/:id', controller.edit);
router.put('/edit/:id', controller.put);

router.delete('/detail/:id?', controller.delete);



module.exports = router;