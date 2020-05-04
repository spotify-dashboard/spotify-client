const login = require('../controllers/login.js');
const Axios = require('axios');

module.exports = {
    player: {
        volume: {
            put: async (req, res) => {
                // turn volume off on ads
                console.log('++++', req.data.params)
                let turnVolumeOff = await Axios.put('https://api.spotify.com/v1/me/player/volume', {
                    headers: {
                        "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                    },
                    params: {
                        volume_percent: 100
                    }
                })
                .then(response => {
                    // console.log(response)
                    // res.status(200).json({message: 'volume changed'});
                })
                .catch(err => {
                    console.log('Error changing volume', err);
                    // res.status(400).json(err);
                })
            }
        }
    }
}