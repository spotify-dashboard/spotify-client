const router = require('express').Router();
const newReleasesController = require('../controllers/newReleases.js');

router.get('/tracks', newReleasesController.newReleases.get);

module.exports = router;