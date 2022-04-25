import React from "react";
import { hot } from 'react-hot-loader/root';

function TodaysForecast(props) {
  let locInfo = null;
  let timeInfo = null;
  if (props.currentLocation !== null) {
    locInfo = `${props.currentLocation.city}, ${props.currentLocation.state}`;
    timeInfo = `As of ${props.weatherInfo.retrievedTime}`
  }
  console.log(props.weatherInfo)
  return (
    <div className="today_container">
      <header className="today_header">
        <span>{locInfo}</span><span className="today_time">{timeInfo}</span>
        </header>
      <div className="today_details_container">
        <div className="today_details">
          <h2 className="today_temp">50</h2>
          <h3 className="today_desc">Sunny</h3>
          <h3 className="today_hilo">Day 42 Night 23</h3>
        </div>
        <img className="today_icon"></img>
      </div>
    </div>
  )
}

export default TodaysForecast