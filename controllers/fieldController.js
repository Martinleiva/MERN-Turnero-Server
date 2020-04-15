const Field = require('../models/Field');
const { validationResult } = require('express-validator');

exports.createField = async (req, res) => {
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }    
    try {        
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

        field = new Field(req.body);
        await field.save();    
        res.json(field);        
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg : 'Un error ha ocurrido' });
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

//update field by id
exports.updateField = async (req, res) => {
    try {        
        const { name, sport_type, ground_type, number_of_players, is_roofed, 
                has_lighting, price, is_enabled, photo_1, photo_2 } = req.body;        
        
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
        newField.photo_1 = photo_1;
        newField.photo_2 = photo_2;

        //now update field
        field = await Field.findOneAndUpdate({ _id : req.params.id}, newField, { new : true });
        
        res.json({ field });        
        
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