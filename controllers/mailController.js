const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'variables.env' });
const User = require('../models/User');
const jwt = require ('jsonwebtoken');

// email sender function
exports.sendEmail = async function(req, res){

    const { email } = req.body

    try {

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg: 'Email incorrecto o no esta registrado' });
        }

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
        
        // Definimos el transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${process.env.USERMAIL}`,   
                pass: `${process.env.PASSWORD}`
            }
        });

        // Definimos el email
        const mailOptions = {
            from: 'tucanchaya0@gmail.com',
            to: `${email}`,
            subject: 'Nueva contraseña para TuCanchaYa.com',
            text: `Hola ${user.names}, recientemente solicitaste el cambio de tu contraseña. Si esto no es así, te pedimos que ignores este mensaje. De lo contrario, si deseas modificar tu contraseña, por favor ingresa al siguiente link http://localhost:3000/reset-pass/${token} en donde tendras un tiempo de 1 hs (una hora) para hacer el cambio, de no ser así, deberas repetir el proceso solicitando un cambio de contraseña nuevamente. Muchas gracias TuCanchaYa.com`
        };

        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email enviado");
                res.status(200).jsonp(req.body);
            }
        });


    } catch (error) {
        console.log(error);
    }
};
