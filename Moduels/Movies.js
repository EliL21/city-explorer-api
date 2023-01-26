'use strict';

const axios = require('axios');

let cache = {};


async function getMovies(request, response, next) {
  try {

    let cityName = request.query.searchQuery;

    // **** CREATE MY KEY *****
    let key = `${cityName}Movie`; // ** key = moviePhoto  cache[moviePhoto]

    // **** IF IT EXISTS AND IT IS IN A VALID TIME - SEND THAT DATA
    if(cache[key] && (Date.now() - cache[key].timeStamp) < 3000000){

      console.log('Cache was hit, images are present');
      response.status(200).send(cache[key].data);

    } else {

      console.log('cache missed -- no images present');

      let url = `https://localhost/search/getMovie?client_id=${process.env.UNSPLASH_API_KEY}&query=${cityName}`;
      let moviesResults = await axios.get(url);
      let groomedData = moviesResults.data.results.map(movieObj => new Movies(movieObj));

      // **** Cache the results from the api call
      cache[key] = {
        data: groomedData,
        timeStamp: Date.now()
      };
      response.status(200).send(groomedData);
    }

  } catch (error) {
    next(error);
  }
}


class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview= movieObj.overview;
    this.poster_path=movieObj.poster_path;
  }
}


module.exports = getMovies;
