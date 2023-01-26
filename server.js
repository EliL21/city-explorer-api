'use strict';

// **** REQUIRES ****
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./Moduels/Weather.js');
const getMovies = require('./Moduels/Movies.js');






const app = express();

// **** MIDDLEWARE ****

app.use(cors());



const PORT = process.env.PORT || 3002;


// **** ENDPOINTS ****

// *** Base endpoint - proof of life

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});





app.get('/Weather', getWeather);

app.get('/Movie', getMovies);





app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));
