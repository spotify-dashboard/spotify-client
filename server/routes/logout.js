const router = require('express').Router();
const logoutController = require('../controllers/logout.js');

router.get('/', logoutController.logout);

module.exports = router;