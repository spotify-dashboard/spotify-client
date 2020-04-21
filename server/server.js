const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');

require('dotenv').config();

//routes
const loginRouter = require('./routes/login.js');
const profileRouter = require('./routes/profile.js');
const musicLibraryRouter = require('./routes/music_library.js');

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
app.use('/api/profile', profileRouter);
app.use('/api/user-library', musicLibraryRouter);

// ==== serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// ==== handle page refresh
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});