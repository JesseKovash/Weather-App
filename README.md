# Weather App

## Try the app for yourself [here](https://jesses-weather-source.herokuapp.com/)

## About
I decided to recreate the most popular weather website. Search for your city to see the current weather, hourly forecast, 7 day future forecast and current precipitation radar. Feel free to add multiple cities and toggle between cities on the favorites bar.  

## Technology
This application was built with React(function components) and Node.js. The city search functionality was created with node-geocoder and lodash for debouncing. The fetch API was used to interact with an Express server. Different endpoints on the server retrieved location data from node-geocoder and weather data from OpenWeatherMap.org. OpenWeatherMap.org API provided data to make rendering of the current weather, hourly forecast, and future 7 day forecast possible. In addition, OpenWeatherMap.org also has an API that provides different tile overlays (precipitation, heat index, cloud cover, etc...) that work with different mapping APIs. I chose to use React Leaflet for my mapping and the OpenWeatherMap.org API precipitation tile overlay for the radar view. The radar view has zoom in/out functionality and precipitation is represented by a purple color (I would have chosen green, but the free API does not allow changing of this color). Ability to switch between metric(degC & km/h) and imperial units(degF & mph) by clicking on US|F or US|C. User cities are stored on localStorage which allow retrieval after refresh and in new windows. Styling and responsiveness was achieved using CSS. Responsive across all device screen widths. Deployed on Heroku. Check out the link above!

![Responsiveness](http://g.recordit.co/UkwMGMmcCf.gif)




