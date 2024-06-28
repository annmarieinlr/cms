//this takes advantage of express features.
const express = require('express');

const app = express();

//this is middleware
app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hello from express');
});

//app.use(express.static(path.join(__dirname, 'dist/cms')));
module.exports = app;