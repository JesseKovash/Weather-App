import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import EachHour from './eachHour.jsx';
// import {
//   days, getDayOfWeek, getDayOfMonth, getMonth, getYear, getFutureWeekdays, getFutureMonthDays, numberOfDays, isLeapYear
// } from './../calcTime.js';

function HourlyForecast() {
  const Values = useContext(LocationContext);
  let hourlyDetails = Values?.weatherInfo?.hourly;
  let hourly;
  if (Values.currentLocation !== null && Values.hourly) {
    hourly =
      <div className="hourly_container">
        <div className="hourly_top">
          <h2>Hourly Weather
            <span>-{Values.currentLocation.city}, {Values.currentLocation.state}</span>
          </h2>
          <h3>As of {Values.weatherInfo.retrievedTime}</h3>
        </div>
        {/* <div className="seven_today_details">
          <p className="seven_date">{Values?.dayOptions?.weekDays[0]} {Values?.dayOptions?.monthDays[0]}</p>
        </div> */}
        <EachHour hourlyDetails={hourlyDetails} />
      </div>

  }
  return (
    <>
      {hourly}
    </>
  )
}

export default HourlyForecast