const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');
const { getTrackData } = require('../helpers/getTrackData.js');

// song cache to save playlists, cut down on api calls
const songCache = {};

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
            //if songs are not cached
            if (!songCache.hasOwnProperty(req.params.id)) {
                console.log('cache does not include playlist');
                //get songs and save in cache
                getTrackData(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
                .then(response => {
                    songCache[req.params.id] = response;
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log("Error in playlists get by id", err);
                    res.status(400).json({message: "Error getting playlist data", error: err});
                });
            } else if (songCache.hasOwnProperty(req.params.id)) {
                // if songs are in cache
                console.log('Serving cached playlist');
                // serve cached songs
                res.status(304).json(songCache[req.params.id])
            } else {
                console.log('song cache error');
                res.status(400).json({message: 'Error retrieving songs from cache'});
            }
        }
    }
}