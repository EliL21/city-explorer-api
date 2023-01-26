'use strict';

// **** REQUIRES ****
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weather = require('./Moduels/Weather.js');
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



// ****** DEFINE WEATHER ENDPOINT WITH THE FOLLOWING QUERIES - lat, lon, searchQuery
// async function getWeather(request, response, next) {
//   try {
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    // let cityName = req.query.searchQuery;

//     let city = data.find(city => city.city_name.toLowerCase() === cityName.toLocaleLowerCase());

//     let weatherData = city.data.map(dayobj => new FORECAST(dayobj));



//     res.status(200).send(city);

//   } catch (error) {
//     next(error)
//   }
// }


app.get('/Weather', weather.getWeather);

app.get('./Movies', getMovies);

app.get('/movie', async (request, response, next) => {
  try {
    
    let cityName = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`
    console.log(url);
    let movieBit = await axios.get(url)
    console.log(movieBit.data.results);





    let movieData = movieBit.data.results.map(movieObj => new Movies(movieObj));
    console.log(movieData);
    response.status(200).send(movieData);

  } catch (error) {
    // next (error);
    console.log('this is the error', error)
  }
})




app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));