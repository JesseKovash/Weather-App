import React from "react";
import { hot } from 'react-hot-loader/root';

function TodaysForecast(props) {
  const temp = props.weatherInfo?.current?.temp || '';
  const descriptionDisplay = props.weatherInfo?.current?.weather[0].description || '';
  const dayTemp = props.weatherInfo?.daily[0].temp.day ?
    props.weatherInfo.daily[0].temp.day :
    '';
  const nightTemp = props.weatherInfo?.daily[0].temp.night ?
    props.weatherInfo.daily[0].temp.night :
    '';
  let locInfo = '';
  let timeInfo = '';
  let tempDisplay = '';
  let dayTempDisplay = '';
  let nightTempDisplay = '';

  if (temp !== '') {
    tempDisplay = props.tempScale === 'F' ?
      `${props.toFahrenheit(temp)} ${props.tempScale}` :
      `${props.toCelsius(temp)} ${props.tempScale}`;
  }

  if (dayTemp !== '' && nightTemp !== '') {
    if (props.tempScale === 'F') {
      dayTempDisplay = `Day ${props.toFahrenheit(props.weatherInfo?.daily[0].temp.day)} `;
      nightTempDisplay = `Night ${props.toFahrenheit(props.weatherInfo?.daily[0].temp.night)}`;
    } else {
      dayTempDisplay = `Day ${props.toCelsius(props.weatherInfo?.daily[0].temp.day)} `;
      nightTempDisplay = `Night ${props.toCelsius(props.weatherInfo?.daily[0].temp.night)}`;
    }
  }

  if (props.currentLocation !== null) {
    locInfo = `${props.currentLocation.city}, ${props.currentLocation.state}`;
    timeInfo = `As of ${props.weatherInfo.retrievedTime}`
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