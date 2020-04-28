const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');
const { getTrackData } = require('../helpers/getTrackData.js');

module.exports = {
    // get all of current user's playlists
    all: {
        get: (req, res) => {
            getAllPlaylists('https://api.spotify.com/v1/me/playlists')
                .then(results => {
                    res.status(200).json(results);
                })
                .catch(err => {
                    console.log('Error in Playlist controller', err);
                    res.status(400).json({message: "Error getting all playlists", error: err})
                });
        }
    },
    // get a playlist by id
    playlist: {
        get: (req, res) => {
            console.log(req.params.id);
            getTrackData(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log("Error in playlists get by id", err);
                    res.status(400).json({message: "Error getting playlist data", error: err});
                });
        }
    }
}