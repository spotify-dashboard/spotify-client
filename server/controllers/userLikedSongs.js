const  { getTrackData } = require('../helpers/getTrackData.js');

module.exports = {
    likedSongs: {
        tracks: {
            get: (req, res) => {

                getTrackData('https://api.spotify.com/v1/me/tracks')
                    .then(results => {
                        console.log('results from promise', results);
                        res.status(200).json(results);
                    })
                    .catch(err => {
                        console.log("Error from getTrackData Promise", err);
                    });
            }
        }
    }
}