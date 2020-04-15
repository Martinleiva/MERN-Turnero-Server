const mongoose = require('mongoose');

const GroundTypeSchema = mongoose.Schema({

    description: { type: String, required: true, trim: true }            
    
});

module.exports = mongoose.model('GroundType', GroundTypeSchema);