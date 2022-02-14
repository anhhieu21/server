var express = require('express');
var router = express.Router();
var controller = require('../controllers/follows');

router.post('/creatordetele', controller.creatFollow);
router.post('/getidFollow', controller.notification);
router.post('/getTotalFl', controller.totalFl);

module.exports = router;