const SportType = require('../models/SportType');
const { validationResult } = require('express-validator');

exports.createSportType = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {        
        sportType = new SportType(req.body);
        await sportType.save();
        res.json({ msg: 'Tipo de Deporte creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }

}

//Get all sportTypes
exports.getSportTypes = async (req, res) => {
    try {                
        const sportTypes = await SportType.find();
        res.json({ sportTypes });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//Get all sportType by id
exports.getSportTypeById = async (req, res) => {
    try {                                  
        const sportType = await SportType.findById(req.params.id);
        res.json({ sportType });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update sportType by id
exports.updateSportType = async (req, res) => {
    try {        
        const { description } = req.body;        
        
        let sportType = await SportType.findById(req.params.id);

        if(!sportType){
            return res.status(404).json({ msg: 'No existe el tipo de deporte' });
        }            

        //Create a new object with the new data
        const newSportType = {};
        newSportType.description = description;                              

        //now update sportType
        sportType = await SportType.findOneAndUpdate({ _id : req.params.id}, newSportType, { new : true });
        
        res.json({ sportType });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}

//delete a sportType
exports.deleteSportType = async (req, res) => {
    try {
              
        const sportType = await SportType.findById(req.params.id);

        if(!sportType){
            return res.status(404).json({ msg: 'No existe el tipo de deporte' });
        }
        
        await SportType.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Tipo de Deporte Eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}