const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve(__dirname, '../public/img'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = 'product-' + Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage })

router.get('/list', controller.list);

router.get('/detail/:id?', controller.detail);

router.get('/create', controller.create);
router.post('/', upload.single('img'), controller.post);

router.get('/edit/:id', controller.edit);
router.put('/edit/:id', controller.put);

router.delete('/detail/:id?', controller.delete);



module.exports = router;