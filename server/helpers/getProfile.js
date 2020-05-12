const login = require ('../controllers/login.js'); // credentials

module.exports.getProfile = () => {
    return new Promise(async (resolve, reject) => {

        // cache for profile info
        let profileCache = {};

        // get info if not in cache
        if (!profileCache.hasOwnProperty('profile')) {
            await login.credentials.getMe()
                .then(data => {
                    // add to cache
                    profileCache.profile = data.body;
                    // serve
                    resolve(data.body);
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            // serve from cache
            resolve(profileCache["profile"]);
        }
    });
};