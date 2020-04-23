const router = require('express').Router();
const userTopController = require('../controllers/userTop.js');

//type is artists or tracks
router.get('/:type', userTopController.top.get);

module.exports = router;