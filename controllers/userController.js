const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }

    //Extract email and password
    const { email, password } = req.body;
    
    try {

        // Validate that the user is unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({msg: 'El usuario ya existe!'}) 
        }

        //Create a new user
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt); 

        // Save user
        await user.save();

        // Create and sign the jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign the jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {

            if(error) throw error;

            // Confirmation message
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Un error ha ocurrido');
    }
    
}

// actualizar un proyecto (modificar)
exports.updateUser = async (req, res) => {

    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array()});
    }

    // extraer la informacion del usuario
    const { names, last_names, tel, cuit, email } = req.body;
    const newUser = {};

    if ( names && last_names && tel && cuit && email) {
        newUser.names = names;
        newUser.last_names = last_names;
        newUser.tel = tel;
        newUser.cuit = cuit;
        newUser.email = email;
    }

    try {
        
        // revisar el ID
        let user = await User.findById(req.params.id);

        // si el usuario existe o no
        if(!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        // verificar el usuario
        // if (proyecto.creador.toString() !== req.usuario.id ) {
        //     return res.status(401).json({ msg: 'Acceso no autorizado'})
        // }

        // actualizar el usuario
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set : newUser }, { new : true });
        res.json({user});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}