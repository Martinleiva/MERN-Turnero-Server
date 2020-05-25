// Routes to create categories
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/service
router.post('/', 
    auth,
    [        
        check('description', 'La descripción es requerida').not().isEmpty(),     
    ],    
    serviceController.createService
);

router.get('/',
    //auth,
    serviceController.getServices
);

router.get('/:id',
    auth,
    serviceController.getServiceById
);

router.put('/:id',
    auth,
    serviceController.updateService
);

router.delete('/:id',
    auth,
    serviceController.deleteService
);

module.exports = router;