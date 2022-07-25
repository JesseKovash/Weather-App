import React, { useContext } from "react";
// import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import EachHour from './eachHour.jsx';

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
          <h3>As of {Values.weatherInfo?.retrievedTime}</h3>
        </div>
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