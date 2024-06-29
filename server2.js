// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app2');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

var index = require('./server/routes/app2');
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');
const documentRoutes = require('./server/routes/documents');

// Create an instance of express
var app2 = express(); 

// Tell express to use the following parsers for POST data
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({
  extended: false
}));
app2.use(cookieParser());

app2.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app2.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app2.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell express to map the default route ('/') to the index route
app2.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app2.use('/messages', messageRoutes);
app2.use('/contacts', contactRoutes);
app2.use('/documents', documentRoutes);

// Tell express to map all other non-defined routes back to the index page
app2.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app2.set('port', port);

// Create HTTP server.
const server = http.createServer(app2);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});


