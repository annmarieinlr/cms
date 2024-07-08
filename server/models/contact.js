const { name } = require('ejs');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactSchema = mongoose.Schema({ 
    _id: { type: String, required: true, default: uuidv4},
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', contactSchema);