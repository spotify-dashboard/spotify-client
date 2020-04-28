const login = require('../controllers/login.js');

module.exports = {
    logout: (req, res) => {
        
        if (login.credentials._credentials.accessToken) {
            
            // delete access and refresh tokens
            delete login.credentials._credentials.accessToken;
            delete login.credentials._credentials.refreshToken;

            res.status(200).json({message: 'Removing access token, user is logged out', isLoggedIn: false});
        } else {
            res.status(200).json({message: "User is not logged in"});
        }
    }
};