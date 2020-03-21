const User = require('../models/User');     

exports.createUser = async (req, res) => {
        
    try {
        let user;

        //Create a new user
        user = new User(req.body); 

        // Save user
        await user.save();

        // Confirmation message
        res.send('User as been created successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('An error has occurred');
    }
    
}