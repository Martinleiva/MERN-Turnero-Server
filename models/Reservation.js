const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    reservation_date: { type: Date, require: true, trim: true},

    start_hour: { type: String, require: true, trim: true},
    
    end_hour: { type: String, require: true, trim: true},
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    
    field_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Fields' },
    
    created_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Reservation', ReservationSchema);