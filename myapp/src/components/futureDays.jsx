import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js'

function FutureDays() {
  const Values = useContext(LocationContext);
  let nextSeven = Values?.weatherInfo?.daily?.slice(1);
  let dayDetails = null;
  console.log(nextSeven)
  if (nextSeven) {
    dayDetails = nextSeven.map((oneDay, index) => (
      <div className="future_day">
        <div className="future_one">
          <p>{Values?.dayOptions?.weekDays[index + 1]} {Values?.dayOptions?.monthDays[index + 1]}</p>
        </div>
        <div className="future_two">
          <span className="hi_temp">{
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(oneDay.temp.max)) :
              (Values.toCelsius(oneDay.temp.max))}/
          </span>
          <span className="low_temp"> {
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(oneDay.temp.min)) :
              (Values.toCelsius(oneDay.temp.min))}
          </span>
        </div>
        <img className="future_icon" src={`http://openweathermap.org/img/wn/${oneDay.weather[0].icon}@2x.png`}></img>
        <p className="future_desc">{oneDay.weather[0].description}</p>
        <p className="future_wind">
          <span className="future_dir">
            {Values.windDirection(oneDay.wind_deg) + " "}
          </span>
          <span className="future_speed">{
            Values.tempScale === 'F' ?
              (Values.windMPH(oneDay.wind_speed) + ' mph') :
              (Values.windKMH(oneDay.wind_speed) + ' kmh')}
          </span>
        </p>
      </div>
    ))
  }

  return (
    <div>
      <div>{dayDetails}</div>
    </div>
  )
}

export default FutureDays