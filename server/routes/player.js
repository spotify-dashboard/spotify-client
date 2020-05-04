const router = require('express').Router();
const playerController = require('../controllers/player.js');

router.get('/volume', playerController.player.volume.put);

module.exports = router;