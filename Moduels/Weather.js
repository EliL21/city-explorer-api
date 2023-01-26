'use strict';
const axios = require('axios');

let cache = require('./cache.js');


async function getWeather(req, res, next) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let cityName = req.query.searchQuery;
  console.log(lat, lon);
  const key = 'weather-' + lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let forecastData = await axios.get(url);
    // .then(response => parseWeather(response.data));
    let weatherData = forecastData.data.data.map(dayObj => new Weather(dayObj));

    cache[key] = {
      data: weatherData,
    };
    res.status(200).send(weatherData);
  }
}

function parseWeather(weatherData) {
  console.log('here');
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;

