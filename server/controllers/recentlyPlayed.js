const  { getTrackData } = require('../helpers/getTrackData.js');

module.exports = {
    recently_played: {
        get: (req, res) => {

            getTrackData('https://api.spotify.com/v1/me/player/recently-played', 50)
                .then(results => {
                    console.log('recent tracks results', results)
                    res.status(200).json(results);
                })
                .catch(err => {
                    console.log("Error from getTrackData Promise", err);
                    res.status(400).json({message: "Error", error: err});
                });
        }
    }
}