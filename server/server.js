const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

//routes

//app and port
const app = express();
const PORT = process.env.PORT || 8080;

// ==== middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// ==== serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// ==== handle page refresh
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

//routes

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});