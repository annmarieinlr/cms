
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = mongoose.Schema({
   _id: { type: String, required: true, default: uuidv4},
   subject: { type: String },
   msgText: { type: String, required: true },
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('Message', messageSchema);