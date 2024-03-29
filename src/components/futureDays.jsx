import React, { useContext } from "react";
import { LocationContext } from '../App.js'

function FutureDays() {
  const Values = useContext(LocationContext);
  let nextSeven = Values?.weatherInfo?.daily?.slice(1);
  let dayDetails = null;
  if (nextSeven) {
    dayDetails = nextSeven.map((oneDay, index) => (
      <div className="future_day" key={oneDay.moonrise}>
        <div className="future_one table_cell">
          <p>{Values?.dayOptions?.weekDays[index + 1]} {Values?.dayOptions?.monthDays[index + 1]}</p>
        </div>
        <div className="future_two table_cell">
          <p className="hi_temp">{
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(oneDay.temp.max)) :
              (Values.toCelsius(oneDay.temp.max))}&deg;/
          </p>
          <p className="low_temp"> {
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(oneDay.temp.min)) :
              (Values.toCelsius(oneDay.temp.min))}&deg;
          </p>
        </div>
        <div className="future_three table_cell">
          <img className="future_icon" src={`http://openweathermap.org/img/wn/${oneDay.weather[0].icon}@2x.png`}></img>
        </div>
        <div className="future_four table_cell">
          <p className="future_desc">{oneDay.weather[0].description}</p>
        </div>

        <div className="future_wind table_cell">
          <p className="future_dir">
            {`${Values.windDirection(oneDay.wind_deg)}  `}
          </p>
          <p className="future_speed">{
            Values.tempScale === 'F' ?
              (Values.windMPH(oneDay.wind_speed) + ' mph') :
              (Values.windKMH(oneDay.wind_speed) + ' kmh')}
          </p>
        </div>
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