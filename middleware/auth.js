const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){    
    //get token from header
    const token = req.header('x-auth-token');

    //Check if exist a token
    if(!token){
        res.status(401).json({ msg: 'No hay token. Permiso denegado'});
        return;
    }

    //Verify token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.user = cifrado.user;
        next();
    } catch(error){
        res.status(401).json({ msg: 'Token no valido'});
        return;
    }

}