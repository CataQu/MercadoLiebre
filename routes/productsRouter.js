const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const path = require('path');

const upload = require('../middlewares/productMulterMiddleware')

router.get('/list', controller.list);


router.get('/create', controller.create);
router.post('/', upload.single('image'), controller.post);

router.get('/edit/:id', controller.edit);
router.put('/edit/:id', upload.single('image'), controller.update);

router.get('/detail/:id?', controller.detail);

router.delete('/:id', controller.delete);


module.exports = router;