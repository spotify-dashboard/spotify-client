const router = require('express').Router();
const tracksController = require('../controllers/music_library.js');

router.get('/tracks', tracksController.music_library.tracks.get);

module.exports = router;