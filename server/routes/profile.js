const router = require('express').Router();
const profileController = require('../controllers/profile.js');

router.get('/me', profileController.profile.get)

module.exports = router;