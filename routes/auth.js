// Routes to create users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Auth an user
// api/auth

router.post('/', 
    authController.authUser
);

router.get('/',
    auth,
    authController.getAuthenticatedUser
)

module.exports = router;