const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    last_names: { type: String },
    
    names: { type: String, required: true },

    cuit: { type: Number, trim: true },
    
    email: { type: String, required: true, trim: true, unique: true },

    tel: { type: Number, required: true, trim: true },
    
    password: { type: String, required: true, trim: true },

    user_type: { type: String, required: true },

    register_date: { type: Date, default: Date.now() },

    profile_photo: { type: String, default: '' }
    
});

module.exports = mongoose.model('User', UserSchema);