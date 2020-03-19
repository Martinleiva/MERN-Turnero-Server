const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect with the database
connectDB();

// App's port 
const PORT = process.env.PORT  || 4000;

// Start app
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
