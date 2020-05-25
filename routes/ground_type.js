// Routes to create categories
const express = require('express');
const router = express.Router();
const groundTypeController = require('../controllers/groundTypeController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/category
router.post('/', 
    auth,
    [        
        check('description', 'La descripción es requerida').not().isEmpty(),     
    ],    
    groundTypeController.createGroundType
);

router.get('/',
    //auth,
    groundTypeController.getGroundTypes
);

router.get('/:id',
    auth,
    groundTypeController.getGroundTypeById
);

router.put('/:id',
    auth,
    groundTypeController.updateGroundType
);

router.delete('/:id',
    auth,
    groundTypeController.deleteGroundType
);

module.exports = router;