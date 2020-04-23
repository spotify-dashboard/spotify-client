const router = require('express').Router();
const currentSongController = require('../controllers/currentSong.js');

router.get('/', currentSongController.currentSong.get);

module.exports = router;