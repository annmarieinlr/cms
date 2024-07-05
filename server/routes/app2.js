var express = require('express');
var router = express.Router();

const Message = require('../models/messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

router.get('/messages', function(req, res, next) {
  
});
module.exports = router;