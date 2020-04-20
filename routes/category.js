// Routes to create categories
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//api/category
router.post('/', 
    auth,
    [        
        check('description', 'La descripción es requerido').not().isEmpty(),     
    ],    
    categoryController.createCategory
);

router.get('/',
    auth,
    categoryController.getCategories
);

router.get('/:id',
    auth,
    categoryController.getCategoryById
);

router.put('/:id',
    auth,
    categoryController.updateCategory
);

router.delete('/:id',
    auth,
    categoryController.deleteCategory
);

module.exports = router;