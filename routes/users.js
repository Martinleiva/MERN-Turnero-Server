// Routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Creates an user
// api/users

router.post('/', 
    userController.createUser
);

module.exports = router;