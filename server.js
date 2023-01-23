'use strict';

// **** REQUIRES ****
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// *** FOR LAB DON'T FORGET TO REQUIRE YOUR STARTER JSON FILE ***
let data = require('./weather.json');


// **** Once express is in we need to use it - per express docs
// *** app === server
const app = express();

// **** MIDDLEWARE ****
// *** cors is middleware - security guard that allows us to share resources across the internet **
app.use(cors());


// *** DEFINE A PORT FOR MY SERVER TO RUN ON ***
const PORT = process.env.PORT || 3002;


// **** ENDPOINTS ****

// *** Base endpoint - proof of life
// ** 1st arg - endpoint in quotes
// ** 2nd arg - callback which will execute when someone hits that point

// *** Callback function - 2 parameters: request, response (req,res)


app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

// ****** DEFINE WEATHER ENDPOINT WITH THE FOLLOWING QUERIES - lat, lon, searchQuery

app.get('/weather', (req, res, next) => {
  try {
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    let cityName = req.query.searchQuery;

    let city = data.find(city => city.city_name.toLowerCase() === cityName.toLocaleLowerCase());

    let weatherData = city.data.map(dayobj => new FORECAST(dayobj));



    res.status(200).send(city);

  } catch (error) {
    next(error)
  }
});

app.get('/movie', async (request, response, next)=>{
  try {
    //ToDO- accept search queries - lat,lon, searchQuery - request.query / weather?lat=value&lon=value&searchQuery=value
    let cityName = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`
    console.log(url);
    let movieBit = await axios.get(url)
    console.log(movieBit.data.results);
 
    
    //TODO find the ity in the json data that matches CityName
   
    //TODO use a class to minify the bulky data //! change this
    let movieData = movieBit.data.results.map(movieObj => new Movies(movieObj));
    console.log(movieData);
    response.status(200).send(movieData);

  } catch (error){
    // next (error);
    console.log('this is the error',error)
  }
})

// *** Class to groom bulky data ****

class Forecast {
  constructor(dayObj){
    this.date = vaild_date;
    this.description = dayObj.weather.description;
  }
}

class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview= movieObj.overview;
    this.poster_path=movieObj.poster_path;
  }
}








// **** Forecast CLASS TO GROOM BULKY DATA ****
class FORECAST{
  constructor(dayobj){
    this.date =
    this.description =
  }
}


// **** CATCH ALL ENDPOINT - NEEDS TO BE YOUR LAST DEFINED ENDPOINT ****
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



// ***** SERVER START ******
app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));