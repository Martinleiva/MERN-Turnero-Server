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
        check('names', 'The Name is required').not().isEmpty(),
        //check('cuit', 'The CUIT is required').not().isEmpty(),
        check('email', 'Enter a valid Email').isEmail(),
        check('tel', 'The Telephone Number is required').not().isEmpty(),
        check('password', 'the Password must be at least 6 characters').isLength({ min: 6}),
    ],
    userController.createUser
);

module.exports = router;