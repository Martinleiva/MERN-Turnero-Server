const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.createCategory = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {        
        category = new Category(req.body);
        await category.save();
        res.json({ msg: 'Categoría creada con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }

}

//Get all categories
exports.getCategories = async (req, res) => {
    try {                
        const categories = await Category.find();
        res.json({ categories });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//Get all category by id
exports.getCategoryById = async (req, res) => {
    try {                                  
        const category = await Category.findById(req.params.id);
        res.json({ category });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update category by id
exports.updateCategory = async (req, res) => {
    try {        
        const { description } = req.body;        
        
        let category = await Category.findById(req.params.id);

        if(!category){
            return res.status(404).json({ msg: 'No existe la categoria' });
        }            

        //Create a new object with the new data
        const newCategory = {};
        newCategory.description = description;                              

        //now update category
        category = await Category.findOneAndUpdate({ _id : req.params.id}, newCategory, { new : true });
        
        res.json({ category });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}

//delete a category
exports.deleteCategory = async (req, res) => {
    try {
              
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(404).json({ msg: 'No existe la categoria' });
        }
        
        await Category.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Categoria Eliminada' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}