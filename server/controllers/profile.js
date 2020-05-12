const login = require('../controllers/login.js');
const { getProfile } = require('../helpers/getProfile.js');

module.exports = {
    profile: {
        get: async (req, res) => {
            
            await getProfile()
                .then(profile => {
                    res.status(200).json(profile);
                })
                .catch(err => {
                    console.log("Error getting profile");
                    res.status(400).json({message: "Error", error: err});
                });
        }
    }
}