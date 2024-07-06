var express = require('express');
var router = express.Router();
const Contact = require('../models/contact');
const { name } = require('ejs');

// GET: Retrieve all contacts
router.get('/', async (req, res, next) => {
    try {
      // Call the contacts model find() method to get all contacts in the collection
      const contacts = await Contact.find()
      .populate('group');
  
      // Return response status 200 and a JSON object containing the list of contacts
      res.status(200).json(contacts);
    } catch (err) {
      // If an error occurred, return response status 500 and a JSON object containing information about the error
      res.status(500).json({ error: err.message });
    }
});

// Post: Add a new contacts
  router.post('/', async (req, res, next) => {
    const contact = new Contact({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
       
    });
    contact.save().then(createdContact => {
        res.status(201).json({
            message: 'Message added successfully',
            contactId: createdContact._id
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
  });

  //PUT: Update a contact
router.put('/:id', async (req, res, next) => {
    try {
      // Call the Contact model findOne() method to find and update a specific contact
        Contact.findOne({ _id: req.params.id })
        .then(contact => {
            contact.id = req.body.id;
            contact.name = req.body.subject;
            contact.email = req.body.msgText;
            contact.phone = req.body.sender;
            contact.imageUrl = req.body.imageUrl;
            contact.group = req.body.group;

            Contact.updateOne({ _id: req.params.id }, contact)
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

            contact.save();
            res.status(200).json({ message: 'Contact updated successfully' });
        });

// DELETE: Delete a contact
router.delete('/:id', async (req, res, next) => {
    try {
      // Call the Contact model deleteOne() method to delete a specific contact
      Contact.deleteOne({ _id: req.params.id })
      .then(result => {
          res.status(200).json({ message: 'Contact deleted successfully' });
      })
      .catch(err => {
          res.status(500).json({ error: err.message });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
