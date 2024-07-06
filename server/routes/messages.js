var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const { name } = require('ejs');

// GET: Retrieve all messages
router.get('/', async (req, res, next) => {
    try {
      // Call the Message model find() method to get all messages in the collection
      const messages = await Message.find();
  
      // Return response status 200 and a JSON object containing the list of messages
      res.status(200).json(messages);
    } catch (err) {
      // If an error occurred, return response status 500 and a JSON object containing information about the error
      res.status(500).json({ error: err.message });
    }
});

// Post: Add a new message
  router.post('/', async (req, res, next) => {
    const message = new Message({
        id: req.body.id,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender,
    });
    message.save().then(createdMessage => {
        res.status(201).json({
            message: 'Message added successfully',
            messageId: createdMessage._id
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
  });

  //PUT: Update a message
router.put('/:id', async (req, res, next) => {
    try {
      // Call the Message model findOne() method to find and update a specific message
        Message.findOne({ _id: req.params.id })
        .then(message => {
            message.id = req.body.id;
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

            Message.updateOne({ _id: req.params.id }, message)
            .then(result => {
                res.status(200).json({ message: 'Update successful!' });
            })
        })
        .catch(err => { 
            res.status(500).json({ error: err.message });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    };

            message.save();
            res.status(200).json({ message: 'Message updated successfully' });
        });

// DELETE: Delete a message
router.delete('/:id', async (req, res, next) => {
    try {
      // Call the Message model deleteOne() method to delete a specific message
      Message.deleteOne({ _id: req.params.id })
      .then(result => {
          res.status(200).json({ message: 'Message deleted successfully' });
      })
      .catch(err => {
          res.status(500).json({ error: err.message });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
