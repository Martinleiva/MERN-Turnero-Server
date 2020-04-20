const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({

    description: { type: String, required: true, trim: true }            
    
});

module.exports = mongoose.model('Category', CategorySchema);