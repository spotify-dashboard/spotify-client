const { getProfile } = require('../helpers/getProfile.js');

const profileCache = {
    // save the profile
}

module.exports = {
    profile: {
        get: async (req, res) => {
            if (!profileCache.hasOwnProperty('profile')) {
                await getProfile()
                    .then(profile => {
                        profileCache['profile'] = profile; // save to cache
                        console.log('Profile not cached, getting from API')
                        res.status(200).json(profile); // serve
                    })
                    .catch(err => {
                        console.log("Error getting profile");
                        res.status(400).json({message: "Error", error: err});
                    });
            } else if (profileCache.hasOwnProperty('profile')) {
                console.log('Serving profile from cache');
                res.status(304).json(profileCache['profile']); // serve from cache
            } else {
                console.log("Error getting profile from API and cache")
                res.status(400).json({message: "Error getting profile from API and cache"});
            }
        }
    }
}