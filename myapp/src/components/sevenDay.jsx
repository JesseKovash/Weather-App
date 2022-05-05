import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import FutureDays from './futureDays.jsx'

function SevenDayForecast() {
  const Values = useContext(LocationContext);
  let today;
  let future;
  if (Values.currentLocation !== null) {
    console.log(Values.dayOptions)
    today =
      <div className="seven_top_container">
        <h2>7 Day Weather
          <span>-{Values.currentLocation.city}, {Values.currentLocation.state}</span>
        </h2>
        <h3>As of {Values.weatherInfo.retrievedTime}</h3>
        <div className="seven_today_details">
          <p>{Values?.dayOptions?.weekDays[0]} {Values?.dayOptions?.monthDays[0]}</p>
          <div className="seven_temp_icon">
            <p className="seven_today_temp">{
              Values.tempScale === 'F' ?
                (Values.toFahrenheit(Values.weatherInfo.current.temp)) + ' F' :
                (Values.toCelsius(Values.weatherInfo.current.temp)) + 'C'}
            </p>
            <img src={`http://openweathermap.org/img/wn/${Values.weatherInfo.current.weather[0].icon}@2x.png`}></img>
          </div>
          <p className="seven_today_desc">{Values.weatherInfo.current.weather[0].description}</p>
        </div>
       </div>
  }
  return (
    <div className="seven_container">
      {today}
      <FutureDays/>
    </div>

  )
}

export default SevenDayForecast