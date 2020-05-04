// Routes to create categories
const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/category
router.post('/', 
    auth,
    [        
        check('name', 'El nombre es requerido').not().isEmpty(), 
        check('establishment', 'El complejo es requerido').not().isEmpty(),
        check('sport_type', 'El tipo de deporte es requerido').not().isEmpty(),
        check('number_of_players', 'El número de jugadores es requerido').not().isEmpty(),
        check('is_roofed', 'Debe especificar si es techada o no').not().isEmpty(),
        check('has_lighting', 'Debe especificar si es iluminada o no').not().isEmpty(),
        check('price', 'El precio es requerido').not().isEmpty(),
        check('is_enabled', 'Debe especificar si esta habilitada').not().isEmpty(),
    ],    
    fieldController.createField
);

router.get('/',
    auth,
    fieldController.getFields
);

router.get('/:id',
    auth,
    fieldController.getFieldById
);

router.get('/establishment/:establishmenId',
    auth,
    fieldController.getFieldByEstblishmenId
);

router.get('/sporttype/:sporttypeId',
    auth,
    fieldController.getFieldBySportTypeId
);

router.post('/filter/:id',
    //auth,
    fieldController.getFieldByFilter
);

router.put('/:id',
    auth,
    fieldController.updateField
);

router.delete('/:id',
    auth,
    fieldController.deleteField
);

module.exports = router;