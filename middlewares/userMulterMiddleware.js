const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.resolve(__dirname, '../public/img/avatar'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = 'avatar-' + Date.now() + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage })

module.exports = upload