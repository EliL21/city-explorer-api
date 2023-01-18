'use strict';
// **** REQUIRES *****
console.log('good job!')
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const axios = require('axios');



// *** Create Our Server *****
const app = express();

app.use(cors());


const PORT = process.env.PORT || 3002;



// ***** ENDPOINTS *****
app.get('/weather', (request, response, next)=>{
response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response)=>{
  let 
})

// **** CATCHALL ENDPOINT - NEEDS TO BE YOUR LAST DEFINED ENDPOINT ****
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


// ********ERROR HANDLING *****
app.use((error, request, response next) => {
  response.status(500).send(error.message);
});

// ***** BUILD AN ENDPOINT AN HIT AN API- USE A CLASS TO GROOM THE BULKY DATA
// app.get('/', (request, respomse, next) =>{
//   try{

//   } catch{
    
//   }
// })


app.listen(PORT, ()=>console.log(`We are running on port: ${PORT}`));

// ****** CATCHALL *****
// app.get('*', (request, response))