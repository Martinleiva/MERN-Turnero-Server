const Service = require('../models/Service');
const { validationResult } = require('express-validator');

exports.createService = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    

    try {        
        service = new Service(req.body);
        await service.save();
        res.json({ msg: 'Servicio creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }

}

//Get all services
exports.getServices = async (req, res) => {
    try {                
        const services = await Service.find();
        res.json({ services });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//Get all service by id
exports.getServiceById = async (req, res) => {
    try {                                  
        const service = await Service.findById(req.params.id);
        res.json({ service });
    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
}

//update service by id
exports.updateService = async (req, res) => {
    try {        
        const { description } = req.body;        
        
        let service = await Service.findById(req.params.id);

        if(!service){
            return res.status(404).json({ msg: 'No existe el servicio' });
        }            

        //Create a new object with the new data
        const newService = {};
        newService.description = description;                              

        //now update Service
        service = await Service.findOneAndUpdate({ _id : req.params.id}, newService, { new : true });
        
        res.json({ service });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}

//delete a service
exports.deleteService = async (req, res) => {
    try {
              
        const service = await Service.findById(req.params.id);

        if(!service){
            return res.status(404).json({ msg: 'No existe el servicio' });
        }
        
        await Service.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Servicio Eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Un error ha ocurrido');    
    }
}