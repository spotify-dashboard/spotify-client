const login = require('../controllers/login.js');

module.exports = {
    currentSong: {
        get: (req, res) => {
            login.credentials.getMyCurrentPlaybackState({})
                .then(data => {
                    console.log(data.body)
                    res.status(200).json(data.body)
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        }
    }
}