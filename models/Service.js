const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({

    description: { type: String, required: true, trim: true },            
    icon : {type : String}
});

module.exports = mongoose.model('Service', ServiceSchema);