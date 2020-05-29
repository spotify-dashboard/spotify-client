const Axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.MY_CLIENT_ID,
  clientSecret: process.env.MY_CLIENT_SECRET,
  redirectUri: process.env.NODE_ENV === 'production' ? 'https://spotify-tool.herokuapp.com/login/callback' : 'http://localhost:8080/login/callback'
});

scopes = [
    'user-read-private', //profile info
    'user-read-email',
    'playlist-modify-public', //playlists
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read', //user library
    'user-library-modify',
    'user-top-read', // listening history
    'user-read-recently-played',
    'user-read-playback-position',
    'user-follow-read', // follow
    'user-follow-modify',
    'streaming', // playback
    'app-remote-control',
    'user-read-playback-state', // spotify connection
    'user-modify-playback-state',
    'user-read-currently-playing'
];


module.exports = {
    login: (req, res) => {
        var html = spotifyApi.createAuthorizeURL(scopes)
        res.redirect(html+"&show_dialog=true");
    },
    callback: async (req,res) => {
        const { code } = req.query;
        
        try {
          var data = await spotifyApi.authorizationCodeGrant(code)
          const { access_token, refresh_token } = data.body;
          
          spotifyApi.setAccessToken(access_token);
          spotifyApi.setRefreshToken(refresh_token);
      
          // redirect; either locally or to production url
          process.env.NODE_ENV === 'production' ? res.redirect('https://spotify-tool.herokuapp.com/success') : res.redirect('http://localhost:8080/success')

          res.status(200).send({message: "Signed in successfully"});
        } catch(err) {
          res.redirect('/error');
          res.status(400).json({message: 'Error getting account information', error: err});
        }
    },
    loginCheck: (req, res) => {
        if (spotifyApi._credentials.accessToken !== undefined) {
            res.status(200).json({message: "User is logged in", isLoggedIn: true});
        } else {
            res.status(403).json({message: "User is not logged in", isLoggedIn: false})
        }
    }
}

// used to import credentials into helper functions
module.exports.credentials = spotifyApi;