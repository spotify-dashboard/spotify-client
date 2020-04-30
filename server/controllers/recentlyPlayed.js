const  { getTrackData } = require('../helpers/getTrackData.js');
const { getArtistData } = require('../helpers/getArtistData.js');

module.exports = {
    recently_played: {
        get: (req, res) => {

            // get the tracks, pass in 50 as optional limit since you can ony get 50 recently played songs
            getTrackData('https://api.spotify.com/v1/me/player/recently-played', 50)
                .then(results => {
                    // get artist data for each track and return
                    return getArtistData(results)    
                })
                .then(data => {
                    // console.log(data);
                    res.status(200).json(data);
                })
                .catch(err => {
                    console.log("Error from getTrackData Promise", err);
                    res.status(400).json({message: "Error", error: err});
                });
        }
    }
}

// USE new Date(UTC DATE that you get back from recently playeds)