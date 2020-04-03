const mongoose = require('mongoose');

const SportTypeSchema = mongoose.Schema({

    description: { type: String, required: true, trim: true }            
    
});

module.exports = mongoose.model('SportType', SportTypeSchema);