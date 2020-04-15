// Routes to create sportTypes
const express = require('express');
const router = express.Router();
const sportTypeController = require('../controllers/sportTypeController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/sportType
router.post('/', 
    auth,
    [        
        check('description', 'La descripción es requerido').not().isEmpty(),     
    ],    
    sportTypeController.createSportType
);

router.get('/',
    auth,
    sportTypeController.getSportTypes
);

router.get('/:id',
    auth,
    sportTypeController.getSportTypeById
);

router.put('/:id',
    auth,
    sportTypeController.updateSportType
);

router.delete('/:id',
    auth,
    sportTypeController.deleteSportType
);

module.exports = router;