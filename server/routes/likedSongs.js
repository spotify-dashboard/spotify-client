const router = require('express').Router();
const likedSongsController = require('../controllers/likedSongs.js');

router.get('/tracks', likedSongsController.likedSongs.tracks.get);

module.exports = router;