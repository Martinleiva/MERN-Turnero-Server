const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


//Get id
exports.getIdUser = async (req, res) => {

    try {
        let user = await User.findById(req.params.id);

        console.log('------------------------------------------------------------');
        console.log('ver solo el token ...');
        console.log(req.rawHeaders[1]);
        const tokenE = req.rawHeaders[1];

        console.log('------------------------------------------------------------');
        console.log('ver el ID desde la URL ...');
        console.log(user._id);
        const idUser = String(user.id);

        console.log('------------------------------------------------------------');
        console.log('decifrar el token en el ID');
        let resultado = jwt.verify(tokenE,  process.env.SECRETA);
        console.log('mostrando el contenido del token...');
        console.log(resultado);

        console.log('------------------------------------------------------------');
        console.log('mostrando el ID obtenido del token');
        console.log(resultado.payload.user.id);
        const idToken = String(resultado.payload.user.id);
        console.log(idToken);

        if(idUser !== idToken){
            console.log('ERROR el ID del token y el ID de la URL NO son iguales');
            return res.status(500).json({ msg: 'Hubo un error - El token no coincide con el del usuario' });
        }

        console.log('el ID del token y el ID de la URL son iguales');    
        console.log('------------------------------------------------------------');

        // console.log('enviando el token al localstorage...');    
        // localStorage.setItem('token',tokenE);

        // console.log('------------------------------------------------------------');
        // console.log('recibiendo el token desde el localstorage...');    

        res.status(200).json({ msg: 'Get Exitoso.' });

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// reset password 
exports.postPass = async function(req, res){
   
    const { password, password2 } = req.body;

    try {
        let user = await User.findById(req.params.id);

        // user exists or not
        if(!user) {
            return res.status(404).json({ msg: 'Usuario NO encontrado' });
        }

        //verify if password not empty
        if( password.trim() === '' && password2.trim() === ''){
            return res.status(400).json({ msg: 'Debe completar su nueva contraseña' });
        }

        if( password !== password2){
            return res.status(400).json({ msg: 'Las contraseñas ingresadas no son iguales' });
        }
        
        if(password.length < 6 ) {
            res.status(400).json({ msg: 'La contraseña debe ser de al menos 6 caracteres' });
            return;
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password, salt); 

        // save the new user password
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { password : newPassword });

        res.status(200).json({ msg: 'modificacion exitosa' });

    } catch (error) {
        res.status(400).json({ msg: 'Error Usuario NO encontrado - Acceso denegado' });
    }
};