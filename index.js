const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create server
const app = express();

// Connect with the database
connectDB();

// Enable CORS
app.use(cors());

// Enable express.json
app.use(express.json({ extended: true }));

// App's port 
const PORT = process.env.PORT  || 4000;

app.use(cors());

// import routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

// Start app
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
