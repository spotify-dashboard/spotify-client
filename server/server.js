const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

//routes
const loginRouter = require('./routes/login.js');

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.MY_CLIENT_ID,
  clientSecret: process.env.MY_CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/callback'
});

spotifyApi.setAccessToken();

//app and port
const app = express();
const PORT = process.env.PORT || 8080;

// ==== middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api/login', loginRouter);

// ==== serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// ==== handle page refresh
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});