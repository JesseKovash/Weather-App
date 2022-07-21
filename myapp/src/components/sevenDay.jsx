import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import FutureDays from './futureDays.jsx'

function SevenDayForecast() {
  const Values = useContext(LocationContext);
  let future;
  if (Values.currentLocation !== null && Values.seven) {
    future =
      <div className="seven_container">
        <div className="seven_top_container">
          <div className="seven_inner_top">
            <h2>7 Day Weather
              <span>-{Values.currentLocation.city}, {Values.currentLocation.state}</span>
            </h2>
            <h3>As of {Values.weatherInfo?.retrievedTime}</h3>
          </div>
          <div className="seven_today_details">
            <p className="seven_date">{Values?.dayOptions?.weekDays[0]} {Values?.dayOptions?.monthDays[0]}</p>
            <div className="seven_temp_icon">
              <p className="seven_today_temp">{
                Values.tempScale === 'F' ?
                  (Values.toFahrenheit(Values.weatherInfo.current.temp)) :
                  (Values.toCelsius(Values.weatherInfo.current.temp))}&deg; {Values.tempScale}
              </p>
              <img src={`http://openweathermap.org/img/wn/${Values.weatherInfo?.current.weather[0].icon}@2x.png`}></img>
              <p className="future_wind">
                <span className="future_dir">
                  {Values.windDirection(Values.weatherInfo.current.wind_deg) + " "}
                </span>
                <span className="future_speed">{
                  Values.tempScale === 'F' ?
                    (Values.windMPH(Values.weatherInfo.current.wind_speed) + ' mph') :
                    (Values.windKMH(Values.weatherInfo.current.wind_speed) + ' kmh')}
                </span>
              </p>
            </div>
            <p className="seven_today_desc">{Values.weatherInfo.current.weather[0].description}</p>
          </div>
        </div>
        <FutureDays />
      </div>

  }
  return (
    <>
      {future}
    </>
  )
}

export default SevenDayForecast