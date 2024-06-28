// const express = require('express');
// const path = require('path');
// const app = express();

// //From video:

// // app.router.get('/', function(req, res, next) { 
// //   res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
// // });


// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// // Define routes here
// app.get('/', (req, res) => { res.render('index', { title: 'CMS' }); });
// module.exports = app;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

module.exports = router;