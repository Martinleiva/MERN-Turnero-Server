// Routes to create establishment
const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/establishmentController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/establishment
router.post('/', 
    auth,
    [        
        check('name', 'El nombre es requerido').not().isEmpty(),     
        check('address', 'La dirección es requerido').not().isEmpty(),     
        check('tel', 'El teléfono es requerido').not().isEmpty()        
    ],    
    establishmentController.createEstablishment
);

router.get('/',
    auth,
    establishmentController.getEstablishments
);

router.get('/:id',
    auth,
    establishmentController.getEstablishmentById
);

router.put('/:id',
    auth,
    establishmentController.updateEstablishment
);

router.delete('/:id',
    auth,
    establishmentController.deleteEstablishment
);

module.exports = router;