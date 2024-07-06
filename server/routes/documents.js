var express = require('express');
var router = express.Router();
const Document = require('../models/document');
const { name } = require('ejs');

// GET: Retrieve all documents
router.get('/', async (req, res, next) => {
    try {
      // Call the Document model find() method to get all documents in the collection
      const documents = await Document.find();
  
      // Return response status 200 and a JSON object containing the list of documents
      res.status(200).json(documents);
    } catch (err) {
      // If an error occurred, return response status 500 and a JSON object containing information about the error
      res.status(500).json({ error: err.message });
    }
});

// Post: Add a new document
  router.post('/', async (req, res, next) => {
    const document = new Document({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
    });
    document.save().then(createdDocument => {
        res.status(201).json({
            message: 'Document added successfully',
            documentId: createdDocument._id
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
  });

  //PUT: Update a document
router.put('/:id', async (req, res, next) => {
    try {
      // Call the Document model findOne() method to find and update a specific document
        Document.findOne({ _id: req.params.id })
        .then(document => {
            document.id = req.body.id;
            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;

            Document.updateOne({ _id: req.params.id }, document)
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

            document.save();
            res.status(200).json({ message: 'Document updated successfully' });
        });

// DELETE: Delete a document
router.delete('/:id', async (req, res, next) => {
    try {
      // Call the Document model deleteOne() method to delete a specific document
      Document.deleteOne({ _id: req.params.id })
      .then(result => {
          res.status(200).json({ message: 'Document deleted successfully' });
      })
      .catch(err => {
          res.status(500).json({ error: err.message });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
