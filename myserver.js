'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getMovies = require('./modules/movies');
const getWeather = require('./modules/myWeather');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are up on port: ${PORT}`));


app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server!');
});
app.get('/movies', getMovies);
app.get('/weather', getWeather);

// *** CATCH ALL - SHOULD LIVE AT THE BOTTOM ***
app.get('*', (request, response)=> {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));