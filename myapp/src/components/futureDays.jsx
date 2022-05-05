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
        <img src={`http://openweathermap.org/img/wn/${oneDay.weather[0].icon}@2x.png`}></img>
        <p className="seven_today_desc">{oneDay.weather[0].description}</p>
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