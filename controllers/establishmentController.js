const Establishment = require('../models/Establishment');
const { validationResult } = require('express-validator');

exports.createEstablishment = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {
        if(req.body.photo_1){
            /*Here we need to convert the base64 code to a image and 
            save it inside the 'uploaded-files' directory*/
            const base64Photo1Info = req.body.photo_1;        
            var base64Data = base64Photo1Info.replace(/^data:image\/png;base64,/, "");
            const timestamp = new Date().getTime();
            const urlphoto_1 = `./uploaded-files/${timestamp}.png`; //fisical path
            const path = `/images/${timestamp}.png`; //virtual and public path       
            require("fs").writeFile(urlphoto_1, base64Data, 'base64', function(err) {
                console.log(err);
            });        
            console.log(path);        
            req.body.photo_1 = path; //update the base64 code to the imagen path
        } else{
            req.body.photo_1 = '';
        }

        establishment = new Establishment(req.body);
        await establishment.save();
        res.json({ msg: 'Complejo creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send( {msg: 'Error al crear complejo'});
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

//Get all establishment by ownerId
exports.getEstablishmentByOwner = async (req, res) => {
    try {                                          
        const establishments = await Establishment.find( { 'owner' : req.user.id } ).populate('services');
        res.json({ establishments });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update establishment by id
exports.updateEstablishment = async (req, res) => {
    try {        
        
        const { name, address, tel, coordinates, category, 
                sunday, monday, tuesday, wednesday, thursday, 
                friday, saturday, services } = req.body;        
        
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
        newEstablishment.photo_2 = '';                              
        newEstablishment.sunday = sunday;
        newEstablishment.monday = monday;
        newEstablishment.tuesday = tuesday;
        newEstablishment.wednesday = wednesday;
        newEstablishment.thursday = thursday;
        newEstablishment.friday = friday;
        newEstablishment.saturday = saturday;
        newEstablishment.services = services;

        /*Here we need to convert the base64 code to a image and 
        save it inside the 'uploaded-files' directory*/
        if(req.body.photo_1){        
            const base64Photo1Info = req.body.photo_1;        
            var base64Data = base64Photo1Info.replace(/^data:image\/png;base64,/, "");
            const timestamp = new Date().getTime();
            const urlphoto_1 = `./uploaded-files/${timestamp}.png`; //fisical path
            const path = `/images/${timestamp}.png`; //virtual and public path       
            require("fs").writeFile(urlphoto_1, base64Data, 'base64', function(err) {
                console.log(err);
            });
            newEstablishment.photo_1 = path;        
        }                

        //now update establishment
        establishment = await Establishment.findOneAndUpdate({ _id : req.params.id}, newEstablishment, { new : true });
        
        res.json({ msg: 'Complejo modificado con exito' });        
        
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