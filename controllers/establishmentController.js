const Establishment = require('../models/Establishment');
const { validationResult } = require('express-validator');

exports.createEstablishment = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {        
        establishment = new Establishment(req.body);
        await establishment.save();
        res.json({ msg: 'Complejo creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }

}

//Get all establishments
exports.getEstablishments = async (req, res) => {
    try {                
        const establishments = await Establishment.find();
        res.json({ establishments });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//Get all establishment by id
exports.getEstablishmentById = async (req, res) => {
    try {                                  
        const establishment = await Establishment.findById(req.params.id);
        res.json({ establishment });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update establishment by id
exports.updateEstablishment = async (req, res) => {
    try {        
        const { name, address, tel, coordinates, category, 
                photo_1, photo_2, sunday, monday, tuesday, 
                wednesday, thursday, friday, saturday } = req.body;        
        
        let establishment = await Establishment.findById(req.params.id);

        if(!establishment){
            return res.status(404).json({ msg: 'No existe el complejo' });
        }            

        //Create a new object with the new data
        const newEstablishment = {};
        newEstablishment.name = name;
        newEstablishment.address = address;
        newEstablishment.tel = tel;
        newEstablishment.coordinates = coordinates;
        newEstablishment.category = category;
        newEstablishment.photo_1 = photo_1;
        newEstablishment.photo_2 = photo_2;                              
        newEstablishment.sunday = sunday;
        newEstablishment.monday = monday;
        newEstablishment.tuesday = tuesday;
        newEstablishment.wednesday = wednesday;
        newEstablishment.thursday = thursday;
        newEstablishment.friday = friday;
        newEstablishment.saturday = saturday;

        //now update establishment
        establishment = await Establishment.findOneAndUpdate({ _id : req.params.id}, newEstablishment, { new : true });
        
        res.json({ establishment });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}

//delete a establishment
exports.deleteEstablishment = async (req, res) => {
    try {
              
        const establishment = await Establishment.findById(req.params.id);

        if(!establishment){
            return res.status(404).json({ msg: 'No existe el complejo' });
        }
        
        await Establishment.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Complejo Eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}