const login = require('../controllers/login.js');

module.exports = {
    currentSong: {
        get: (req, res) => {
            login.credentials.getMyCurrentPlaybackState({})
                .then(data => {
                    res.status(200).json(data.body)
                })
                .catch(err => {
                    console.log('Error getting current song', err);
                    res.status(400).json(err);
                });
        }
    }
}