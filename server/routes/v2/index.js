var express = require('express');
var router = express.Router();

var dailyController = require('../../controllers/daily');
var swiperController = require('../../controllers/swiper');
var videoController = require('../../controllers/video');
var resourceController = require('../../controllers/resource');

// daily route
router.get('/daily', dailyController.getDaily);

// swiper route
router.get('/swiper', swiperController.getSwiper);

// video route
router.get('/video', videoController.getVideo);

//resource route
router.get('/resource/images', resourceController.getImages);
router.get('/resource/images', resourceController.getVideos);

module.exports = router;
