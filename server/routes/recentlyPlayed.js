const router = require('express').Router();
const recentlyPlayedController = require('../controllers/recentlyPlayed.js');

router.get('/',recentlyPlayedController.recently_played.get);

module.exports = router;