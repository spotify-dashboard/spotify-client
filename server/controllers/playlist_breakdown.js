const login = require('../controllers/login.js');
const Axios = require('axios');

const { getAllPlaylists } = require('../helpers/getAllPlaylists.js');
const { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');
const { getGenreData } = require('../helpers/getGenreData.js');
const { getAudioFeatures } = require('../helpers/getAudioFeatures.js');

// cache for playlists
var playlistCache = {
    // key names are playlist ids
        // each key's value is an object containing
            // tracks array


};

module.exports = {
    analyze: {
        // specific playlist breakdown
        playlist: async (req, res) => {

            // get tracks; pass in url with playlist id


        },
        // for aggregating all playlists
        allPlaylists: async (req, res) => {
            
            // array for storing all tracks 
                // added at prop
                // array of ids
            
            // get all playlists
            await getAllPlaylists('https://api.spotify.com/v1/me/playlists')
                .then(response => {
                    // iterate though all playlist ids
                        console.log('all playlists +++', response)
                        // call getTracks func, pass in url with id

                })
                .catch(err => {
                    console.log('Error in allPlaylists breakdown', err);
                    res.status(400).json({message: "Error", error: err});
                })
        }
    }
};