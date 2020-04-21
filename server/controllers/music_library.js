const login = require('../controllers/login.js');

module.exports = {
    music_library: {
        tracks: {
            get: (req, res) => {
                login.credentials.getMySavedTracks({
                    limit : 2,
                    offset: 1
                })
                .then(data => {
                    console.log(data);
                    res.status(200).json(data);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
            }
        }
    }
}