// Routes to create users
const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');
const auth = require('../middleware/auth');

//Auth an user
// api/reset-pass

router.post('/:id', 
    resetPasswordController.postPass
);

router.get('/:id',
    auth,
    resetPasswordController.getIdUser
);

module.exports = router;