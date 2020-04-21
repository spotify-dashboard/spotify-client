const Axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.MY_CLIENT_ID,
  clientSecret: process.env.MY_CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/login/callback'
});

scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'];


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
      
          res.redirect('http://localhost:8080/success');

          res.status(200).send(spotifyApi);
        } catch(err) {
          res.redirect('/#/error/invalid token');
        }
    }
}

module.exports.credentials = spotifyApi;