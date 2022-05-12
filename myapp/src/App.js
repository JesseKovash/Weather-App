import React, { useState, useCallback, useContext, useEffect } from "react";
import { hot } from 'react-hot-loader/root';
import { debounce } from "lodash";
import SevenDayForecast from './components/sevenDay.jsx';
import HourlyForecast from './components/hourly.jsx';
import TodaysForecast from './components/today.jsx';
import Topbar from './components/topBar.jsx';
import OptionsBar from './components/optionsBar.jsx';
import {
  days, getDayOfWeek, getDayOfMonth, getMonth, getYear, getFutureWeekdays, getFutureMonthDays, numberOfDays, isLeapYear
} from './calcTime.js';
import { windDirection, windMPH, windKMH } from './calcWind.js'

export const LocationContext = React.createContext();

function App(props) {
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [today, setToday] = useState(true);
  const [hourly, setHourly] = useState(false);
  const [seven, setSeven] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [tempScale, setTempScale] = useState('F');
  const [dayOptions, setDayOptions] = useState(null);

  useEffect(() => {
    getTime()
  }, [])

  const changeDisplay = function (target) {
    if (target === 'today') {
      setSeven(false)
      setToday(true)
      setHourly(false)
    } else if (target === 'hourly') {
      setSeven(false)
      setToday(false)
      setHourly(true)
    } else if (target === 'seven') {
      setSeven(true)
      setToday(false)
      setHourly(false)
    }
  }

  const toFahrenheit = function (kelvin) {
    return Math.round((kelvin - 273.15) * 9 / 5 + 32)
  }

  const toCelsius = function (kelvin) {
    return Math.round(kelvin - 273.15)
  }

  const debouncedLog = useCallback(
    debounce(city => getLocations(city), 200), []
  );

  const changeTempScale = function () {
    console.log('changing temp')
    tempScale === 'F' ? setTempScale('C') : setTempScale('F');
  }

  const getTime = function () {
    let current = new Date();
    setDayOptions({
      monthDays: getFutureMonthDays(current),
      weekDays: getFutureWeekdays(current),
    })
  }

  const handleChange = function (event) {
    setSearchInput(event.target.value)
    debouncedLog(event.target.value)
  }

  const getLocations = function (cityInfo) {
    fetch(`http://localhost:3001/location/?searchTerm=${cityInfo}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setLocations(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onLocationChange = function (locationData) {
    getCurrentWeather(locationData.latitude, locationData.longitude, locationData)
  }

  const getCurrentWeather = function (lat, lon, locationData) {
    fetch(`http://localhost:3001/getWeather/?lat=${lat}&lon=${lon}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let amOrPM;
        minutes = minutes >= 10 ? minutes : `0${minutes}`;
        if (hours > 12) {
          amOrPM = 'PM';
          hours = hours - 12;
        } else if (hours === 12) {
          amOrPM = 'PM';
        } else {
          amOrPM = 'AM';
        }
        data.retrievedTime = `${hours}:${minutes} ${amOrPM}`
        setWeatherInfo(data)
        setCurrentLocation(locationData)
        setSearchInput('')
        setLocations([])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let valueObj = {
    currentLocation: currentLocation,
    weatherInfo: weatherInfo,
    toFahrenheit: toFahrenheit,
    toCelsius: toCelsius,
    tempScale: tempScale,
    dayOptions: dayOptions,
    windDirection: windDirection,
    windMPH: windMPH,
    windKMH: windKMH,
    today: today,
    hourly: hourly,
    seven: seven,
    changeDisplay: changeDisplay
  }

  return (
    <div className="app_container">
      <Topbar
        handleChange={handleChange}
        onLocationChange={onLocationChange}
        locations={locations}
        searchInput={searchInput}
        changeTempScale={changeTempScale}
      />
      <LocationContext.Provider
        value={valueObj}
      >
        <div className="past_locations_container"></div>
        <OptionsBar />
        <div className="bottom_container">
          <SevenDayForecast />
          <HourlyForecast />
          <TodaysForecast />
        </div>
      </LocationContext.Provider >
    </div >
  );
}

export default hot(App);


//---------------------------------------------
//Class component below
//---------------------------------------------
// import React from "react";
// import { hot } from 'react-hot-loader/root';
// import { debounce } from "lodash";
// import SevenDayForecast from './components/sevenDay.jsx';
// import HourlyForecast from './components/hourly.jsx';
// import TodaysForecast from './components/today.jsx';
// import Topbar from './components/topBar.jsx';
// import OptionsBar from './components/optionsBar.jsx';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchInput: '',
//       locations: [],
//       today: true,
//       hourly: false,
//       seven: false,
//       currentLocation: null,
//       weatherInfo: null
//     }
//     this.getCurrentWeather = this.getCurrentWeather.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.getLocations = this.getLocations.bind(this);
//     this.onLocationChange = this.onLocationChange.bind(this);
//   }

//   debouncedLog = debounce(city => this.getLocations(city), 200)

//   handleChange(event) {
//     this.setState({
//       searchInput: event.target.value
//     });
//     this.debouncedLog(event.target.value);
//   }

//   getLocations(cityInfo) {
//     fetch(`http://localhost:3001/location/?searchTerm=${cityInfo}`)
//       .then((res) => {
//         return res.json()
//       })
//       .then((data) => {
//         this.setState({
//           locations: data
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   onLocationChange(locationData) {
//     this.getCurrentWeather(locationData.latitude, locationData.longitude, locationData)
//   }

//   getCurrentWeather(lat, lon, locationData) {
//     fetch('http://localhost:3001/getWeather')
//       .then((res) => {
//         return res.json()
//       })
//       .then((data) => {
//         let time = new Date();
//         let hours = time.getHours();
//         let minutes = time.getMinutes();
//         let amOrPM;
//         minutes = minutes >=10 ? minutes : `0${minutes}`;
//         if (hours > 12) {
//           amOrPM = 'PM';
//           hours = hours - 12;
//         } else if (hours === 12) {
//           amOrPM = 'PM';
//         } else {
//           amOrPM = 'AM';
//         }
//         data.retrievedTime = `${hours}:${minutes} ${amOrPM}`
//         this.setState({
//           weatherInfo: data,
//           currentLocation: locationData
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   render() {
//     const { name } = this.props;
//     return (
//       <div className="app_container">
//         <Topbar
//           handleChange={this.handleChange}
//           onLocationChange={this.onLocationChange}
//           locations={this.state.locations}
//         />
//         <div className="past_locations_container"></div>
//         <OptionsBar />
//         <div className="bottom_container">
//           <SevenDayForecast/>
//           <HourlyForecast />
//           <TodaysForecast
//             currentLocation={this.state.currentLocation}
//             weatherInfo={this.state.weatherInfo}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default hot(App);