const mongoose = require('mongoose');

const FieldSchema = mongoose.Schema({

    name: { type: String, required: true, trim: true },

    establishment: {type : mongoose.Schema.Types.ObjectId, ref : 'Establishment'},

    sport_type: {type : mongoose.Schema.Types.ObjectId, ref : 'SportType'},

    ground_type: {type : mongoose.Schema.Types.ObjectId, ref : 'GroundType'},
    
    number_of_players: { type: Number, required: true },

    is_roofed: { type: Boolean, required: true },

    has_lighting: { type: Boolean, required: true },

    price: { type: Number, required: true },

    register_date: { type: Date, default: Date.now() },

    is_enabled: { type: Boolean, required: true },

    photo_1: { type: String, default: '' },

    photo_2: { type: String, default: '' }
    
});

module.exports = mongoose.model('Field', FieldSchema);