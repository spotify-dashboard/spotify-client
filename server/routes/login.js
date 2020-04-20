const router = require('express').Router();
const loginController = require('../controllers/login.js');

router.get('/', loginController.login);

module.exports = router;