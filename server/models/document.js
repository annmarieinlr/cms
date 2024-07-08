const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const documentSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: uuidv4},
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    description: { type: Array, ref: 'Document'},
    children: [{ type: String, ref: 'Document'}],

 },
{ _id: false});

// const childDocumentSchema = new mongoose.Schema({
//     _id: { type: String, required: true, default: uuidv4},
//     name: { type: String, required: true },
//     description: { type: String },
//     url: { type: String },
//     description: { type: Array, ref: 'Document'},
//     children: [childDocumentSchema],
 
// });
module.exports = mongoose.model('Document', documentSchema);