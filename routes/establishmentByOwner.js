// Routes to create establishment
const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/establishmentController');
const auth = require('../middleware/auth');

router.get('/',
    auth,
    establishmentController.getEstablishmentByOwner
);

module.exports = router;