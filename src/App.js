import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { debounce } from "lodash";
import SevenDayForecast from "./components/sevenDay.jsx";
import HourlyForecast from "./components/hourly.jsx";
import TodaysForecast from "./components/today.jsx";
import RadarMap from "./components/radarMap.jsx";
import Topbar from "./components/topBar.jsx";
import OptionsBar from "./components/optionsBar.jsx";
import PastLocations from "./components/pastLocations.jsx";
import {
  days,
  getDayOfWeek,
  getDayOfMonth,
  getMonth,
  getYear,
  getFutureWeekdays,
  getFutureMonthDays,
  numberOfDays,
  isLeapYear,
} from "./calcTime.js";
import { windDirection, windMPH, windKMH } from "./calcWind.js";

export const LocationContext = React.createContext();

function App(props) {
  const [searchInput, setSearchInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [pastLocations, setPastLocations] = useState([]);
  const [pastLocationWeather, setPastLocationWeather] = useState([]);
  const [today, setToday] = useState(true);
  const [hourly, setHourly] = useState(false);
  const [seven, setSeven] = useState(false);
  const [radar, setRadar] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [tempScale, setTempScale] = useState("F");
  const [dayOptions, setDayOptions] = useState(null);
  const initialLoad = useRef(true);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  useEffect(() => {
    //navigator to get users current location
    // if (
    //   !localStorage.past_weather_locs ||
    //   localStorage.past_weather_locs === ""
    // ) {
    //   console.log('inside navigator')
    //   localStorage.setItem("past_weather_locs", JSON.stringify([]));
    //   navigator.geolocation.getCurrentPosition(successUserLocation, errorUserLocation, options);
    // } else {
    //   setPastLocations(JSON.parse(localStorage.past_weather_locs));
    // }
      !localStorage.past_weather_locs || localStorage.past_weather_locs === ""
        ? localStorage.setItem("past_weather_locs", JSON.stringify([]))
        : setPastLocations(JSON.parse(localStorage.past_weather_locs));
    getTime();
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      if (pastLocations.length > 0) {
        getWeatherAllLocations();
      }
    } else {
      initialLoad.current = false;
    }
  });

  useEffect(() => {
    localStorage.setItem("past_weather_locs", JSON.stringify(pastLocations));
  }, [pastLocations]);

  //success and error functions for navigator geolocation
  // const successUserLocation = function (pos) {
  //   console.log(pos)
  //   const userLat = pos.coords.latitude;
  //   const userLon = pos.coords.longitude;
  //   getCurrentWeather(userLat, userLon)
  // }

  // const errorUserLocation = function (error) {
  //   console.log('inside error')
  //   console.log(error)
  // }

  const changeDisplay = function (target) {
    if (target === "today") {
      setRadar(false);
      setSeven(false);
      setToday(true);
      setHourly(false);
    } else if (target === "hourly") {
      setRadar(false);
      setSeven(false);
      setToday(false);
      setHourly(true);
    } else if (target === "seven") {
      setRadar(false);
      setSeven(true);
      setToday(false);
      setHourly(false);
    } else if (target === "radar") {
      setRadar(true);
      setSeven(false);
      setToday(false);
      setHourly(false);
    }
  };

  const toFahrenheit = function (kelvin) {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  };

  const toCelsius = function (kelvin) {
    return Math.round(kelvin - 273.15);
  };

  const debouncedLog = useCallback(
    debounce((city) => getLocations(city), 200),
    []
  );

  const changeTempScale = function () {
    tempScale === "F" ? setTempScale("C") : setTempScale("F");
  };

  const getTime = function () {
    let current = new Date();
    setDayOptions({
      monthDays: getFutureMonthDays(current),
      weekDays: getFutureWeekdays(current),
    });
  };

  const handleChange = function (event) {
    setSearchInput(event.target.value);
    debouncedLog(event.target.value);
  };

  const getLocations = function (cityInfo) {
    // fetch(`/location/?searchTerm=${cityInfo}`)
    fetch(`http://localhost:3001/location/?searchTerm=${cityInfo}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLocationChange = function (locationData) {
    getCurrentWeather(locationData.latitude, locationData.longitude).then(
      (results) => formatWeather(results, locationData, true)
    );
  };

  const getCurrentWeather = function (lat, lon) {
    // return fetch(
    //   `/getWeather/?lat=${lat}&lon=${lon}`
    // ).then((res) => res.json());
    return fetch(
      `http://localhost:3001/getWeather/?lat=${lat}&lon=${lon}`
    ).then((res) => res.json());
  };

  const formatWeather = function (oneWeather, locationData, isNew) {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let amOrPM;
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    if (hours > 12) {
      amOrPM = "PM";
      hours = hours - 12;
    } else if (hours === 12) {
      amOrPM = "PM";
    } else {
      amOrPM = "AM";
    }
    oneWeather.retrievedTime = `${hours}:${minutes} ${amOrPM}`;

    if (isNew) {
      //newly searched city
      setWeatherInfo(oneWeather);
      setPastLocations((pastLocations) => [locationData, ...pastLocations]);
      setPastLocationWeather((pastWeather) => [oneWeather, ...pastWeather]);
      setCurrentLocation(locationData);
      setSearchInput("");
      setLocations([]);
      changeDisplay("today");
    } else {
      //initial render from saved cities
      return oneWeather;
    }
  };

  const getWeatherAllLocations = function () {
    initialLoad.current = false;
    Promise.all(
      pastLocations.map((oneLoc) =>
        getCurrentWeather(oneLoc.latitude, oneLoc.longitude, oneLoc, false)
      )
    )
      .then((rawWeather) =>
        rawWeather.map((oneLocWeather, index) =>
          formatWeather(oneLocWeather, null, false)
        )
      )
      .then((finalData) => {
        setCurrentLocation(pastLocations[0]);
        setPastLocationWeather(finalData);
        setWeatherInfo(finalData[0]);
      })
      .catch((e) => console.log(e));
  };

  const deleteLocation = function (index) {
    const updatedLocationList = [...pastLocations];
    updatedLocationList.splice(index, 1);
    const updatedWeatherList = [...pastLocationWeather];
    updatedWeatherList.splice(index, 1);
    setPastLocations(updatedLocationList);
    setPastLocationWeather(updatedWeatherList);
    if (
      pastLocations[index].latitude === currentLocation.latitude &&
      pastLocations[index].longitude === currentLocation.longitude
    ) {
      setCurrentLocation(updatedLocationList[0] || null);
      setWeatherInfo(updatedWeatherList[0] || null);
    }
  };

  let valueObj = {
    currentLocation,
    setCurrentLocation,
    pastLocations,
    pastLocationWeather,
    setPastLocationWeather,
    deleteLocation,
    weatherInfo,
    setWeatherInfo,
    toFahrenheit,
    toCelsius,
    tempScale,
    dayOptions,
    windDirection,
    windMPH,
    windKMH,
    today,
    hourly,
    seven,
    radar,
    changeDisplay,
  };

  return (
    <div className="app_container">
      <Topbar
        handleChange={handleChange}
        onLocationChange={onLocationChange}
        locations={locations}
        searchInput={searchInput}
        tempScale={tempScale}
        changeTempScale={changeTempScale}
      />
      <LocationContext.Provider value={valueObj}>
        <PastLocations />
        <OptionsBar />
        <div className="bottom_container">
          <SevenDayForecast />
          <HourlyForecast />
          <TodaysForecast />
          <RadarMap />
        </div>
      </LocationContext.Provider>
    </div>
  );
}

export default App;
