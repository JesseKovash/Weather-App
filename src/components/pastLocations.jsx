import React, { useContext, useRef } from "react";
import { LocationContext } from "../App.js";
import "animate.css";

function PastLocations() {
  const Values = useContext(LocationContext);
  const {
    setWeatherInfo,
    setCurrentLocation,
    changeDisplay,
    deleteLocation,
    toFahrenheit,
    toCelsius,
    tempScale,
    weatherInfo,
    pastLocations,
  } = Values;
  const childrenRef = useRef(null);

  function showDeleteBtn(index) {
    const targetChild = childrenRef.current.children[index].children[1];
    const threeDotsEl = (targetChild.children[0].style.display = "none");
    const deleteBtnEl = (targetChild.children[1].style.display = "block");
    setTimeout(()=> {
      const threeDotsEl = (targetChild.children[0].style.display = "block");
    const deleteBtnEl = (targetChild.children[1].style.display = "none");
    }, 10000)
  }

  return (
    <div className="past_locations_container" ref={childrenRef}>
      {Values.pastLocationWeather.map((oneLoc, index) => (
        <div
          key={`${oneLoc.lat}${oneLoc.lon}`}
          className="one_past_location"
        >
          <div
            className="past_loc_left"
            data-id={index}
            onClick={(e) => {
              const targetIndex = +e.currentTarget.getAttribute("data-id");
              setWeatherInfo(Values.pastLocationWeather[targetIndex]);
              setCurrentLocation(Values.pastLocations[targetIndex]);
              changeDisplay("today");
            }}
          >
            <div className="past_loc_iconTemp">
              <div className="past_loc_icon_cont">
                <img
                  className="past_loc_icon"
                  src={`http://openweathermap.org/img/wn/${oneLoc.current?.weather[0].icon}@2x.png`}
                ></img>
              </div>
              <div className="past_loc_temp">
                <p className="past_loc_temp">
                  {Values.tempScale === "F"
                    ? Values.toFahrenheit(oneLoc?.current?.temp)
                    : Values.toCelsius(oneLoc?.current?.temp)}
                  &deg; {Values.tempScale}
                </p>
              </div>
            </div>
            <div className="past_loc_cityState">{`${pastLocations[index]?.city}, ${pastLocations[index]?.state}`}</div>
          </div>
          <div className="past_loc_right">
            <button
              className="threedots_button"
              onClick={() => showDeleteBtn(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 threedots_icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
            <button
              className="delete_button animate__animated animate__slideInRight"
              onClick={() => deleteLocation(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PastLocations;
