var express = require('express');
var router = express.Router();
var controller = require('../controllers/product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '/server1/server/public/images',
    filename : (req, file, cb) =>{
        
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})


router.post('/createproduct',upload.single('image_product'), controller.createProduct);
router.get('/getPro', controller.getAll);
router.post('/getUser', controller.getUserbyID);
router.post('/getProductbyId', controller.getProductbyId);
router.post('/getUserSell', controller.getUserbyID)

module.exports = router;
