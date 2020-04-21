const router = require('express').Router();
const loginController = require('../controllers/login.js');

router.get('/', loginController.login);
router.get('/callback', loginController.callback);

module.exports = router;