const login = require('../controllers/login.js');

module.exports = {
    newReleases: {
        get: (req, res) => {
        login.credentials.getNewReleases({ limit : 5, offset: 0, country: 'US' })
            .then(data => {
                console.log(data.body);
                res.status(200).json(data.body)
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        }
    }
}