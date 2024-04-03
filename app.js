'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
require('./mongodb-connection')(app);

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
app.upload = multer({ storage: storage });

// app.use('/api', express.static(path.join(__dirname, 'dist')));

// Other routes
require('./router')(app);


// Handle production
// Static folder
app.use(express.static(__dirname + '/dist/'));

// Handle SPA
app.use(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));