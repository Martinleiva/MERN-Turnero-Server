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
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/service', require('./routes/service'));
app.use('/api/ground-type', require('./routes/ground_type'));
app.use('/api/sport-type', require('./routes/sport_type'));
app.use('/api/establishment', require('./routes/establishment'));
app.use('/api/establishment-by-owner', require('./routes/establishmentByOwner'));
app.use('/api/field', require('./routes/field'));

// Start app
app.listen( PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
