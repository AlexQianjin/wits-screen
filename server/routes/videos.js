var express = require('express');
var router = express.Router();

var videosController = require('../controllers/videos');

/* GET videos listing. */
router.get('/', videosController.getVideos);

router.post('/upload', videosController.uploadVideos);

router.get('/isEnabled', videosController.isEnabled);

router.put('/setEnabled', videosController.setEnabled);

module.exports = router;
