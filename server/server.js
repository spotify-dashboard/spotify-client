const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');

require('dotenv').config();

//routes
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const profileRouter = require('./routes/profile.js');
const likedSongsRouter = require('./routes/userLikedSongs.js');
const currentSongRouter = require('./routes/currentSong.js');
const newReleasesRouter = require('./routes/newReleases.js');
const userTopRouter = require('./routes/userTop.js');
const playlistsRouter = require('./routes/playlists.js');
const recentlyPlayedRouter = require('./routes/recentlyPlayed.js');
const playerRouter = require('./routes/player.js');

//app and port
const app = express();
const PORT = process.env.PORT || 8080;

// ==== middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api/profile', profileRouter);
app.use('/api/user-library', likedSongsRouter);
app.use('/api/current-song', currentSongRouter);
app.use('/api/new-releases', newReleasesRouter);
app.use('/api/top', userTopRouter);
app.use('/api/playlists', playlistsRouter);
app.use('/api/recently-played', recentlyPlayedRouter);
app.use('/api/player', playerRouter);

// ==== serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// ==== handle page refresh
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});