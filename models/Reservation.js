const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    
    title: { type: String, require: true, trim: true},

    start: { type: Date, require: true, trim: true},
    
    end: { type: Date, require: true, trim: true},
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    
    field_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Fields' },
    
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Reservation', ReservationSchema);