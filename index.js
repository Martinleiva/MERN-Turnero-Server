const express = require('express');
const path = require("path");
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create server
const app = express();

// Connect with the database
connectDB();


app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// Enable CORS
app.use(cors());

// Enable express.json
app.use(express.json({ extended: true }));

// App's port 
const PORT = process.env.PORT  || 4000;

app.use('/images', express.static('./uploaded-files'));

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
