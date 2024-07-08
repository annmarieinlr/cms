var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const mongoURI = 'mongodb://localhost:27017/cms';

// // Connect to the database
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect("mongodb+srv://annmarieinlr:q0E4b0DTsAitmfZc@cluster0.huxjjlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true

//   });
//   console.log('Connected to MongoDB Atlas');
// } catch (err) {
//   console.error('Error connecting to MongoDB Atlas', err);
// }
// }

// connectToMongoDB()
//   .then(() => {
//     // Any additional initialization or logic after connecting
//     console.log('API running on localhost:3000');
//   })
//   .catch((err) => {
//     console.error('Error starting the API server', err);
//   });

// const Message = require('../models/message');

// router.post('/messages', async (req, res, next) => {
//   try {
//     const newMessage = new Message({
//       id: req.body.id,
//       subject: req.body.subject,
//       msgText: req.body.msgText,
//       sender: req.body.sender
//     });
//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../dist/cms/browser/index.html'));
});

// router.post('/messages', function(req, res, next) {

// });
module.exports = router;