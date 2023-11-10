'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Midleware

app.use(bodyParser.json())
app.use(cors())

// Routes

require('./router')(app);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`listening on port ${port}`))