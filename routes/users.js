// Routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

//Creates an user
// api/users

router.post('/', 
    [
        //check('last_names', 'The Last name is required').not().isEmpty(),
        check('names', 'El Nombre es requerido').not().isEmpty(),
        //check('cuit', 'The CUIT is required').not().isEmpty(),
        check('email', 'Ingrese un Email válido').isEmail(),
        check('tel', 'El Teléfono es requerido').not().isEmpty(),
        check('password', 'El Password debe ser de al menos 6 caracteres').isLength({ min: 6}),
    ],
    userController.createUser
);


// update the user by ID
router.put('/:id',
    [
        check('names', 'El nombre es requerido').not().isEmpty(),
        check('tel', 'El teléfono es requerido').not().isEmpty(),
        check('email', 'Ingrese un email válido').isEmail()
    ],
    userController.updateUser
);


module.exports = router;