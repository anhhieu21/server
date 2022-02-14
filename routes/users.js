var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })



router.get('/', controller.getUser);

router.post('/register', controller.createUser);
router.post('/login', controller.checkLogin);
router.post('/sendmailchangepass', controller.sendmailchangepass);
router.post('/forgotpass', controller.forgotpass);
router.post('/sendmail', controller.sendmailcreateuser);
router.post('/checkcode', controller.checkcode);
router.post('/getemail', controller.getUserByEmail);
router.post('/getUserById', controller.getUserById);
router.post('/checkcodeforgot', controller.checkcodeforgotpass);
router.post('/update', upload.single('avatar'), controller.updateUsers);
router.post('/loginfb', controller.createfb);
router.post('/logingg', controller.creategg);
router.post('/followUser', controller.followUser);
router.post('/followId', controller.followUser1);



module.exports = router;
