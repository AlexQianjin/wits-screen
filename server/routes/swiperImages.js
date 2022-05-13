var express = require('express');
var router = express.Router();

var imagesController = require('../controllers/swiperImages');

/* GET employees listing. */
router.post('/', imagesController.uploadImage);
router.get('/', imagesController.getSwiperImages);
router.get('/isopen', imagesController.getShowSwiper);
router.get('/getRollPicType', imagesController.getRollPicType);
module.exports = router;