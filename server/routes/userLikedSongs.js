const router = require('express').Router();
const likedSongsController = require('../controllers/userLikedSongs.js');

router.get('/tracks', likedSongsController.likedSongs.tracks.get);

module.exports = router;