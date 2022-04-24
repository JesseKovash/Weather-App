const express = require('express');
const cors = require('cors')
const axios = require('axios');
const {weatherAccess} = require('../config.js');
const {Geo} = require('../geocoder/geo.js')
var app = express()
app.use(cors())
const port = 3000

app.get('/getWeather', (req, res) => {
  let lat = "22";
  let lon = "33";
  axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherAccess}`
  )
    .then((response)=>{
      return response.data
    })
    .then((data)=>{
      res.status(200).send(data)
    })
    .catch((err)=> {
      res.send(err)
    })
})

app.get('/location', (req, res) => {
  console.log('getting locations')
  Geo(req.query.searchTerm)
    .then((data)=> {
      let cityOptions = [];

      data.forEach((result) => {
        if (result.countryCode === 'US'
          && result.city !== undefined
          && result.state !== undefined
          && result.latitude !== undefined
          && result.longitude !== undefined) {
          cityOptions.push(
            {
              address: result.formattedAddress,
              latitude: result.latitude,
              longitude: result.longitude
            })
        }
      })
      res.status(200).send(cityOptions)
    })
    .catch((err)=> {
      console.log(err);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})