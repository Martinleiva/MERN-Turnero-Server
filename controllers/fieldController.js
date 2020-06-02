const Field = require('../models/Field');
const Establishment = require('../models/Establishment');
const { validationResult } = require('express-validator');

exports.createField = async (req, res) => {
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    
    try {
        
        const existField = Field.find({'name' : req.body.name, 'establishment' : req.body.establishment });

        if(existField) {
            res.status(400).send( {msg: `Ya existe una cancha con el nombre ${req.body.name}`});
        }

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
        
        field = new Field(req.body);
        await field.save();    
        res.json(field);        
    } catch (error) {
        console.log(error);
        res.status(400).send( {msg: 'Error al crear cancha'});
    }

}

//Get all fields
exports.getFields = async (req, res) => {
    try {                
        const fields = await Field.find().populate('establishment').populate('sport_type').populate('ground_type');
        res.json({ fields });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
    }
}

//Get all field by id
exports.getFieldById = async (req, res) => {
    try {                                  
        const field = await Field.findById(req.params.id).populate('sport_type').populate('ground_type');
        res.json({ field });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
    }
}

//Get all fields by EstblishmenId
exports.getFieldByEstblishmenId = async (req, res) => {
    try {                                          
        const fields = await Field.find({ 'establishment' : req.params.establishmenId}).populate('sport_type').populate('ground_type');
        res.json({ fields });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
    }
}

//Get all fields by sport type
exports.getFieldBySportTypeId = async (req, res) => {
    try {              
        const fields = await Field.find({ 'sport_type' : req.params.sporttypeId}).populate('sport_type').populate('ground_type').populate('establishment');
        res.json({ fields });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
    }
}

//Get all fields by sport type
exports.getFieldByFilter = async (req, res) => { 
    console.log('getFieldByFilter:', req.body);   
    try {        
        const {sport_type, ground_type, roofed, lighted, services} = req.body;
        
        let query = {}

        if(lighted) {
            query.has_lighting = true
        }

        if(roofed) {
            query.is_roofed = true
        }    
                
        const fields = await Field.find(query)
            .populate('sport_type', null, { _id : sport_type } )
            .populate('ground_type', null, ground_type !== 'all' ? { _id : ground_type } : {})  
            .populate('establishment', null, services.length > 0 ? { services: { $all: services } } : {});   
        

        //We need to clean the above result query. In other words, to remove all fields that have null establisment.
        const filteredFields = fields.filter(field => (
            field.establishment !== null && field.sport_type !== null && field.ground_type !== null
        ))
                                    
        /*const fields = await Field.aggregate()
                                    .lookup({ 
                                         from: Establishment.collection.name, 
                                         localField: 'establishment', 
                                         foreignField: '_id', 
                                         as: 'establishment' }).unwind('services')
                                         .match({ 'establishment.services' : { $in: ['5e8753d17086622ea490f155', '5e8753d67086622ea490f156'] } })*/

        res.json({ filteredFields });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
    }
}

//update field by id
exports.updateField = async (req, res) => {
    try {        
        const { name, sport_type, ground_type, number_of_players, is_roofed, 
                has_lighting, price, is_enabled } = req.body;        
        
        let field = await Field.findById(req.params.id);

        if(!field){
            return res.status(404).json({ msg: 'No existe cancha' });
        }            

        //Create a new object with the new data
        const newField = {};
        newField.name = name;
        newField.sport_type = sport_type;
        newField.ground_type = ground_type;
        newField.number_of_players = number_of_players;
        newField.is_roofed = is_roofed;
        newField.has_lighting = has_lighting;
        newField.price = price;
        newField.is_enabled = is_enabled;
        
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
            newField.photo_1 = path;        
        }   

        //now update field
        field = await Field.findOneAndUpdate({ _id : req.params.id}, newField, { new : true });
        
        res.json({ msg:'La cancha ha sido modificada' });        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg : 'Un error ha ocurrido' });    
    }
}

//delete a field
exports.deleteField = async (req, res) => {
    try {
              
        const field = await Field.findById(req.params.id);

        if(!field){
            return res.status(404).json({ msg: 'No existe cancha' });
        }
        
        await Field.findOneAndRemove({ _id : req.params.id});
        res.json({ msg: 'Cancha Eliminada' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg : 'Un error ha ocurrido' });    
    }
}