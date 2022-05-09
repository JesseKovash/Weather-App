import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';

function HourlyForecast() {
  const Values = useContext(LocationContext);
  let hourlyDetails = Values?.weatherInfo?.hourly;
  let hourly;
  console.log(hourlyDetails)
  if (Values.currentLocation !== null && Values.hourly) {
    hourly =
    <div className="hourly_container">
      <div>{hourlyDetails[0].dt}</div>
      <div>{hourlyDetails}</div>
    </div>
  }
  return (
    <>
      {hourly}
    </>
  )
}

export default HourlyForecast