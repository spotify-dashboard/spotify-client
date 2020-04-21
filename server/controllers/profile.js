const Axios = require('axios');
const login = require('../controllers/login.js');

module.exports = {
    profile: {
        get: (req, res) => {
            login.credentials.getMe()
                .then(data => {
                    res.status(200).json(data.body)
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        }
    }
}