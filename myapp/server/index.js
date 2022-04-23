const express = require('express')
var cors = require('cors')
const axios = require('axios');
var app = express()
app.use(cors())
const port = 3000

app.get('/getWeather', (req, res) => {
  console.log('inserver')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})