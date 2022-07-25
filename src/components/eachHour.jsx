import React, { useContext } from "react";
import { LocationContext } from '../App.js';
import {
  days, fullDays, months, hours, getHours, getDayOfWeek, getDayOfMonth, getMonth, getYear, getFutureWeekdays, getFutureMonthDays, numberOfDays, isLeapYear
} from './../calcTime.js';

function EachHour(props) {
  const Values = useContext(LocationContext);
  let details = props.hourlyDetails;
  let dayOne = null;
  let dayTwo = null;
  let dayThree = null;

  function first(dayOptions) {
    let currentDay = new Date(dayOptions[0].dt * 1000);
    let dayOfMonth = getDayOfMonth(currentDay);
    let allHours = [];
    for (var i=0; i<dayOptions.length; i++) {
      let newCurrentDay = new Date(dayOptions[i].dt * 1000);
      if (getDayOfMonth(newCurrentDay) === dayOfMonth) {
        allHours.push(oneHrDetails(dayOptions[i]))
      } else {
        dayOptions = dayOptions.slice(i);
        break;
      }
    }

    dayOne =
      <div className="hour_day">
        <span className="time_det">{fullDays[getDayOfWeek(currentDay)]}, </span>
        <span className="time_det hour_month">{months[getMonth(currentDay)]}</span>
        <span className="time_det">{getDayOfMonth(currentDay)}</span>
        <div className="oneHr_container">
          {allHours}
        </div>
      </div>

    second(dayOptions)
  }
  first(details)

  function second (dayOptions) {
    let currentDay = new Date(dayOptions[0].dt * 1000);
    let dayOfMonth = getDayOfMonth(currentDay);
    let allHours = [];
    for (var i=0; i<dayOptions.length; i++) {
      let newCurrentDay = new Date(dayOptions[i].dt * 1000);
      if (getDayOfMonth(newCurrentDay) === dayOfMonth) {
        allHours.push(oneHrDetails(dayOptions[i]))
      } else {
        dayOptions = dayOptions.slice(i);
        break;
      }
    }

    dayTwo =
      <div className="hour_day">
        <span className="time_det">{fullDays[getDayOfWeek(currentDay)]}, </span>
        <span className="time_det hour_month">{months[getMonth(currentDay)]}</span>
        <span className="time_det">{getDayOfMonth(currentDay)}</span>
        <div className="oneHr_container">
          {allHours}
        </div>
      </div>

    third(dayOptions)
  }

  function third (dayOptions) {
    let currentDay = new Date(dayOptions[0].dt * 1000);
    let dayOfMonth = getDayOfMonth(currentDay);
    let allHours = [];
    for (var i=0; i<dayOptions.length; i++) {
      let newCurrentDay = new Date(dayOptions[i].dt * 1000);
      if (getDayOfMonth(newCurrentDay) === dayOfMonth) {
        allHours.push(oneHrDetails(dayOptions[i]))
      }
    }

    dayThree =
      <div className="hour_day">
        <span className="time_det">{fullDays[getDayOfWeek(currentDay)]}, </span>
        <span className="time_det hour_month">{months[getMonth(currentDay)]}</span>
        <span className="time_det">{getDayOfMonth(currentDay)}</span>
        <div className="oneHr_container">
          {allHours}
        </div>
      </div>
  }

  function oneHrDetails(hour) {
    let newTime = new Date(hour.dt * 1000);
    return (
      <div className="future_hr" key={hour.dt}>
        <div className="hour_one">
          <p>{hours[getHours(newTime)]}</p>
        </div>
        <div className="hour_two">
          <p className="hour_temp">{
            Values.tempScale === 'F' ?
              (Values.toFahrenheit(hour.temp)) :
              (Values.toCelsius(hour.temp))}
              &deg;
          </p>
        </div>
        <div className="hour_three">
          <img className="hour_icon" src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}></img>
        </div>
        <div className="hour_four">
          <p className="hour_desc">{hour.weather[0].description}</p>
        </div>

        <div className="hour_wind">
          <p className="hour_dir">
            {`${Values.windDirection(hour.wind_deg)}  `}
          </p>
          <p className="hour_speed">{
            Values.tempScale === 'F' ?
              (Values.windMPH(hour.wind_speed) + ' mph') :
              (Values.windKMH(hour.wind_speed) + ' kmh')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
    {dayOne}
    {dayTwo}
    {dayThree}
    </>
  )
}

export default EachHour