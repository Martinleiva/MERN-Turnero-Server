const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Creates an reservation
// api/reservation

router.post('/', //Check the params for the field
    auth,
    [
        check('start', 'La hora de inicio de la reservación es obligatoria').not().isEmpty(),
        check('end', 'La hora de fin de la reservación es obligatoria').not().isEmpty(),
        check('field_id', 'La cancha es obligatoria').not().isEmpty(),
        check('user_id', 'El usuario es obligatorio').not().isEmpty(),
    ],
    reservationController.createReservation
);

// Get reservations by field
router.get('/',
    auth,
    reservationController.getReservationsByField
);

//Get all reservations
// router.get('/', 
//     auth,
//     reservationController.getReservations
// );

//Update reservation with id
router.put('/:id',
    auth,
    [
        check('start_hour', 'La hora de inicio de la reservación es obligatoria').not().isEmpty(),
        check('end_hour', 'La hora de fin de la reservación es obligatoria').not().isEmpty(),
        check('end_hour', 'La hora de fin de la reservación es obligatoria').not().isEmpty(),
    ],
    reservationController.updateReservation
)

// Delete reservation
router.delete('/:id', 
    auth,
    reservationController.deleteReservation
);

module.exports = router;