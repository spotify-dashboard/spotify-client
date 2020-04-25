const router = require('express').Router();
const loginController = require('../controllers/login.js');

router.get('/', loginController.login);
router.get('/callback', loginController.callback);
router.get('/logged-in', loginController.loginCheck);

module.exports = router;