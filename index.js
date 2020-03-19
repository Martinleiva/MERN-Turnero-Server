const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect with the database
connectDB();

// Enable express.json
app.use(express.json({ extended: true }));

// App's port 
const PORT = process.env.PORT  || 4000;

// import routes
app.use('/api/users',require('./routes/users'));

// Start app
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
