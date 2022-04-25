import React from "react";
import { hot } from 'react-hot-loader/root';
import { debounce } from "lodash";
import SevenDayForecast from './components/sevenDay.jsx';
import HourlyForecast from './components/hourly.jsx';
import TodaysForecast from './components/today.jsx';
import Topbar from './components/topBar.jsx';
import OptionsBar from './components/optionsBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      locations: [],
      today: true,
      hourly: false,
      seven: false,
      currentLocation: null,
      weatherInfo: null
    }
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
  }

  debouncedLog = debounce(city => this.getLocations(city), 200)

  handleChange(event) {
    this.setState({
      searchInput: event.target.value
    });
    this.debouncedLog(event.target.value);
  }

  getLocations(cityInfo) {
    fetch(`http://localhost:3000/location/?searchTerm=${cityInfo}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          locations: data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onLocationChange(locationData) {
    this.getCurrentWeather(locationData.latitude, locationData.longitude, locationData)
  }

  getCurrentWeather(lat, lon, locationData) {
    fetch('http://localhost:3000/getWeather')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let amOrPM;
        minutes = minutes >=10 ? minutes : `0${minutes}`;
        if (hours > 12) {
          amOrPM = 'PM';
          hours = hours - 12;
        } else if (hours === 12) {
          amOrPM = 'PM';
        } else {
          amOrPM = 'AM';
        }
        data.retrievedTime = `${hours}:${minutes} ${amOrPM}`
        this.setState({
          weatherInfo: data,
          currentLocation: locationData
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { name } = this.props;
    return (
      <div className="app_container">
        <Topbar
          handleChange={this.handleChange}
          onLocationChange={this.onLocationChange}
          locations={this.state.locations}
        />
        <div className="past_locations_container"></div>
        <OptionsBar />
        <div className="bottom_container">
          <SevenDayForecast/>
          <HourlyForecast />
          <TodaysForecast
            currentLocation={this.state.currentLocation}
            weatherInfo={this.state.weatherInfo}
          />
        </div>
      </div>
    );
  }
}

export default hot(App);