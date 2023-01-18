'use strict';

console.log('good job!')
const express = require('express');
require('dotenv').config();
const cors = require('cors');




const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;




app.get('/', (request, response)=>{
response.status(200).send('Welcome to my server');
});


app.listen(PORT, ()=>console.log(`We are running on port: ${PORT}`));
