const GroundType = require('../models/GroundType');
const { validationResult } = require('express-validator');

exports.createGroundType = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {        
        groundType = new GroundType(req.body);
        await groundType.save();
        res.json({ msg: 'Tipo de Suelo creada con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }

}

//Get all groundTypes
exports.getGroundTypes = async (req, res) => {
    try {                
        const groundTypes = await GroundType.find();
        res.json({ groundTypes });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//Get all groundType by id
exports.getGroundTypeById = async (req, res) => {
    try {                                  
        const groundType = await GroundType.findById(req.params.id);
        res.json({ groundType });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update groundType by id
exports.updateGroundType = async (req, res) => {
    try {        
        const { description } = req.body;        
        
        let groundType = await GroundType.findById(req.params.id);

        if(!groundType){
            return res.status(404).json({ msg: 'No existe el tipo de suelo' });
        }            

        //Create a new object with the new data
        const newGroundType = {};
        newGroundType.description = description;                              

        //now update groundType
        groundType = await GroundType.findOneAndUpdate({ _id : req.params.id}, newGroundType, { new : true });
        
        res.json({ groundType });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}

//delete a groundType
exports.deleteGroundType = async (req, res) => {
    try {
              
        const groundType = await GroundType.findById(req.params.id);

        if(!groundType){
            return res.status(404).json({ msg: 'No existe el tipo de suelo' });
        }
        
        await GroundType.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Tipo de Suelo Eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}