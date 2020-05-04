const login = require('../controllers/login.js');
const Axios = require('axios');

module.exports = {
    currentSong: {
        get: async (req, res) => {
            await Axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                }
            })
                .then( data => {
                    res.status(200).json(data.data);
                })
                .catch(err => {
                    console.log('Error getting current song', err);
                    res.status(400).json({message: 'Error getting current song', error: err});
                });
        }
    }
}