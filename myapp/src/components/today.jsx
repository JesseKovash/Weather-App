import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import {LocationContext} from '../App.js'

function TodaysForecast() {
  const Values = useContext(LocationContext);
  const temp = Values.weatherInfo?.current?.temp || '';
  const descriptionDisplay = Values.weatherInfo?.current?.weather[0].description || '';
  const dayTemp = Values.weatherInfo?.daily[0].temp.day ?
  Values.weatherInfo.daily[0].temp.day :
    '';
  const nightTemp = Values.weatherInfo?.daily[0].temp.night ?
  Values.weatherInfo.daily[0].temp.night :
    '';
  let locInfo = '';
  let timeInfo = '';
  let tempDisplay = '';
  let dayTempDisplay = '';
  let nightTempDisplay = '';

  if (temp !== '') {
    tempDisplay = Values.tempScale === 'F' ?
      `${Values.toFahrenheit(temp)} ${Values.tempScale}` :
      `${Values.toCelsius(temp)} ${Values.tempScale}`;
  }

  if (dayTemp !== '' && nightTemp !== '') {
    if (Values.tempScale === 'F') {
      dayTempDisplay = `Day ${Values.toFahrenheit(Values.weatherInfo?.daily[0].temp.day)} `;
      nightTempDisplay = `Night ${Values.toFahrenheit(Values.weatherInfo?.daily[0].temp.night)}`;
    } else {
      dayTempDisplay = `Day ${props.toCelsius(Values.weatherInfo?.daily[0].temp.day)} `;
      nightTempDisplay = `Night ${props.toCelsius(Values.weatherInfo?.daily[0].temp.night)}`;
    }
  }

  if (Values.currentLocation !== null) {
    locInfo = `${Values.currentLocation.city}, ${Values.currentLocation.state}`;
    timeInfo = `As of ${Values.weatherInfo.retrievedTime}`
  }

  return (
    <div className="today_container">
      <header className="today_header">
        <span>{locInfo}</span><span className="today_time">{timeInfo}</span>
      </header>
      <div className="today_details_container">
        <div className="today_details">
          <h2 className="today_temp">{tempDisplay}</h2>
          <h3 className="today_desc">{descriptionDisplay}</h3>
          <h3 className="today_hilo">{`${dayTempDisplay} ${nightTempDisplay}`}</h3>
        </div>
        <img className="today_icon"></img>
      </div>
    </div>
  )
}

export default TodaysForecast