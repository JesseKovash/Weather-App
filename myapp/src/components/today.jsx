import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js'

function TodaysForecast() {
  const Values = useContext(LocationContext);
  let today;
  let temp;
  let descriptionDisplay;
  let locInfo;
  let timeInfo;
  let tempDisplay;
  let dayTempDisplay;
  let nightTempDisplay;
  let displayModal;
  if (Values.currentLocation !== null && Values.today) {
    let data = Values.weatherInfo;

    temp = data?.current?.temp || '';
    descriptionDisplay = data?.current?.weather[0].description || '';
    const dayTemp = data?.daily[0].temp.day ?
    data.daily[0].temp.day :
      '';
    const nightTemp = data?.daily[0].temp.night ?
    data.daily[0].temp.night :
      '';
    if (temp !== '') {
      tempDisplay = Values.tempScale === 'F' ?
        `${Values.toFahrenheit(temp)}` :
        `${Values.toCelsius(temp)}`;
    }

    if (dayTemp !== '' && nightTemp !== '') {
      if (Values.tempScale === 'F') {
        dayTempDisplay = `Day ${Values.toFahrenheit(data?.daily[0].temp.day)}`;
        nightTempDisplay = `Night ${Values.toFahrenheit(data?.daily[0].temp.night)}`;
      } else {
        dayTempDisplay = `Day ${Values.toCelsius(data?.daily[0].temp.day)}`;
        nightTempDisplay = `Night ${Values.toCelsius(data?.daily[0].temp.night)}`;
      }
    }

    locInfo = `${Values.currentLocation.city}, ${Values.currentLocation.state}`;
    timeInfo = `As of ${data.retrievedTime}`;


    today =
      <div className="today_container">
        <header className="today_header">
          <span>{locInfo}</span><span className="today_time">{timeInfo}</span>
        </header>
        <div className="today_details_container">
          <div className="today_details">
            <h2 className="today_temp">{tempDisplay}&deg;</h2>
            <h3 className="today_desc">{descriptionDisplay}</h3>
            {/* <h3 className="today_hilo">{`${dayTempDisplay} ${nightTempDisplay}`}</h3> */}
            <h3 className="today_hilo">{`${dayTempDisplay}`}&deg; {`${nightTempDisplay}`}&deg;</h3>
          </div>
          <img className="today_icon"></img>
        </div>
      </div>
  }

  return (
    <>
      {today}
    </>
  )
}

export default TodaysForecast

