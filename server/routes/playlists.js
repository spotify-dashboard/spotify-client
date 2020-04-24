const router = require('express').Router();
const playlistsController = require('../controllers/playlists.js');

router.get('/', playlistsController.all.get);
router.get('/:id', playlistsController.playlist.get);

module.exports = router;