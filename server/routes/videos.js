var express = require('express');
var router = express.Router();

var videosController = require('../controllers/videos');

/* GET employees listing. */
router.get('/', videosController.getVideos);

router.post('/upload', videosController.uploadVideos);

module.exports = router;
