const express = require('express');
const cors = require('cors')
const axios = require('axios');
// const {weatherAccess} = require('../config.js');
const {Geo} = require('../geocoder/geo.js')
var app = express()
app.use(cors())
const port = 3001

const abbreviations = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Deleware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY'
}

const stateAbbrev = function(state) {
  let abbreviation = abbreviations[state]
  return abbreviation
}

app.get('/getWeather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  console.log('lat: ', lat, '  lon: ', lon)
  axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=bc5478df38b07b39ed924f4b833a75ac`
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
              city: result.city,
              state: stateAbbrev(result.state),
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