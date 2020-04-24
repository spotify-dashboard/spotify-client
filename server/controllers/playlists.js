const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');

module.exports = {
    all: {
        get: (req, res) => {
            getAllPlaylists('https://api.spotify.com/v1/me/playlists')
                .then(results => {
                    res.status(200).json(results);
                })
                .catch(err => {
                    console.log('Error in Playlist controller', err);
                });
        }
    },
    playlist: {
        get: (req, res) => {

        }
    }
}