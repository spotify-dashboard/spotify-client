const router = require('express').Router();
const playlistBreakdownController = require('../controllers/playlist_breakdown.js');

router.get('/all', playlistBreakdownController.analyze.allPlaylists);
router.get('/:id', playlistBreakdownController.analyze.playlist);

module.exports = router;