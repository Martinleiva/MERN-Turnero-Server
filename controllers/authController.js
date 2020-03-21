const User = require('../models/User');
const bcryptjs = require('bcryptjs');
//const {validationResult} = require('express-validator');
const jwt = require ('jsonwebtoken');

exports.authUser = async (req, res) => {

    const {email, password} = req.body;    

    try {

        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: 'El Usuario no existe' });
        }

        //const passwordOk = await bcryptjs.compare(password, user.password);
        const passwordOk = user.password === password;
        if(!passwordOk){
            return res.status(400).json({ msg: 'El password es incorrecto' })
        }
        
        //create and sign jwt
        const payload = {
            user : {
                id : user.id
            }
        };
       
        jwt.sign(payload, process.env.WORD_SECRET, {
            expiresIn : 3600 
        }, (error, token) => {
            if(error) throw error;                        
            res.json({token});
        });
        
    } catch (error) {
        console.log(error);
    }
}

exports.getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //El -password significa que al password no lo queremos seleccionar
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'A error has ocurred' });
    }
}