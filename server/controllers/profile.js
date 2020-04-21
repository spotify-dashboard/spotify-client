const Axios = require('axios');
const login = require('../controllers/login.js');

module.exports = {
    profile: {
        get: (req, res) => {
            // console.log(login.credentials)
            login.credentials.getMe()
                .then(data => {
                    console.log(data)
                    res.status(200).json(data.body)
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        }
    }
}