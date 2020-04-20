const Reservation = require('../models/Reservation');
const { validationResult } = require('express-validator');

//Ver parte de lsa fechas y comenzar con la parte de canchas CARPETA 24

exports.createReservation = async (req, res) => {
    // Check erros
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        // Create a new reservation
        const reservation = new Reservation(req.body);
        //Save the creator for jwt
        reservation.user_id = req.user.id;

        await reservation.save();
        res.json(reservation);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Get all reservations from the user
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user_id: req.user.id });
        res.json({ reservations });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Update a reservation
exports.updateReservation = async (req, res) => {
    
    // Check erros
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }

    //Extract info of reservation
    const { reservation_date, start_hour, end_hour } = req.body;
    const newReservation = {};

    if (reservation_date) {
        newReservation.reservation_date = reservation_date;
    }

    if (start_hour) {
        newReservation.start_hour = start_hour;
    }

    if (end_hour) {
        newReservation.end_hour = end_hour;
    }

    try {
        //Check id
        let reservation = await Reservation.findById(req.params.id);

        //If the reservatio exists
        if(!reservation) {
            return res.status(404).json({ msg: 'Reservación no encontrada' });
        }

        // Check the user creator
        if(reservation.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        //Update reservation
        reservation = await Reservation.findOneAndUpdate({ _id: req.params.id }, { $set: newReservation }, { new: true });

        res.json({ reservation });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//Delete reservation
exports.deleteReservation = async (req, res) => {

    const { reservation_date } = req.body;
    
    try {
        //Check id
        let reservation = await Reservation.findById(req.params.id);

        //If the reservatio exists
        if(!reservation) {
            return res.status(404).json({ msg: 'Reservación no encontrada' });
        }

        // Check the user creator
        if(reservation.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }

        //Check the date 
        const dateNow = new Date(Date.now()).toISOString().slice(0,10);
        console.log(dateNow, reservation_date);

        if( dateNow === reservation_date) {
            return res.status(500).json({ msg: 'No se puede borrar el mismo dia de la reserva' });
        }

        //Delete reservation
        await Reservation.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Reserva Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}