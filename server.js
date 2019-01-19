// Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DATABASE_URL = require('./config.js');

// API routes
const api = require('./server/routes/api');

const app = express();

mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;

// Parsers for POST 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// direct static path to dist 
app.use(express.static(path.join(__dirname, 'dist')));

// Set api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/user-management-portal/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on designated port
server.listen(port, () => console.log(`API running on localhost:${port}`));