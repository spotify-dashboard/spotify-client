const Axios = require('axios');
const login = require('../controllers/login.js');

module.exports = {
    top: {
        get: (req, res) => {
            Axios.get(`https://api.spotify.com/v1/me/top/${req.params.type}`, {
                headers: {
                    "Authorization": 'Bearer ' + login.credentials._credentials.accessToken
                },
                params: {
                    limit: 50,
                    offset: 1
                }
            })
            .then(response => {
                res.status(200).json(response.data.items);
            })
            .catch(err => {
                res.status(400).json({message: 'Error getting top artists and tracks', error: err});
            });        
        }
    },
}