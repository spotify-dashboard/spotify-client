const  { getTrackData } = require('../helpers/getTrackData.js');

module.exports = {
    likedSongs: {
        tracks: {
            get: (req, res) => {

                getTrackData('https://api.spotify.com/v1/me/tracks')
                    .then(results => {
                        res.status(200).json(results);
                    })
                    .catch(err => {
                        console.log("Error from getTrackData Promise", err);
                        res.status(400).json({message: "Error", error: err});
                    });
            }
        }
    }
}