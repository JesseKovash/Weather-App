import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import {LocationContext} from '../App.js'

function SevenDayForecast (props) {
  const Values = useContext(LocationContext);
  let today;
  let future;
  if (Values.currentLocation !== null) {
    console.log(Values.weatherInfo)
    today =
      <div>
        <h2>7 Day Weather - {Values.currentLocation.city}</h2>
        <h3>As of {Values.weatherInfo.retrievedTime}</h3>
        <div className="seven_today_details">
          <p>Need to add Today's date</p>
          <div className="seven_temp_icon">
          <p className="seven_today_temp">{
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(Values.weatherInfo.current.temp)) + ' F' :
              (Values.toCelsius(Values.weatherInfo.current.temp)) + 'C'}
          </p>
          <img src={`http://openweathermap.org/img/wn/${Values.weatherInfo.current.weather[0].icon}@2x.png`}></img>
          </div>
          <p>{Values.weatherInfo.current.weather[0].description}</p>

        </div>
      </div>
  }
  return (
    <div className="seven_container">
      {today}
    </div>

  )
}

export default SevenDayForecast