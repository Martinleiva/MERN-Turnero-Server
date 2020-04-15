const mongoose = require('mongoose');

const EstablishmentSchema = mongoose.Schema({

    name: { type: String, required: true },    

    address: { type: String, trim: true },

    tel: { type: String, required: true, trim: true },

    coordinates: { type: String, trim: true },

    owner: {type : mongoose.Schema.Types.ObjectId, ref : 'User'},

    category: {type : mongoose.Schema.Types.ObjectId, ref : 'Category'},

    services: [{type : mongoose.Schema.Types.ObjectId, ref : 'Service'}],

    register_date: { type: Date, default: Date.now() },

    photo_1: { type: String, default: '' },

    photo_2: { type: String, default: '' },

    sunday: { type: String },
    
    monday: { type: String },

    tuesday	: { type: String },

    wednesday: { type: String },

    thursday: { type: String },

    friday: { type: String },

    saturday: { type: String }    
    
});

module.exports = mongoose.model('Establishment', EstablishmentSchema);