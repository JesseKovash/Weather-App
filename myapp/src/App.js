import React from "react";
import { hot } from 'react-hot-loader/root';
import SevenDayForecast from './components/sevenDay.jsx';
import HourlyForecast from './components/hourly.jsx';
import TodaysForecast from './components/today.jsx';
import Topbar from './components/topBar.jsx';
import OptionsBar from './components/optionsBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: true,
      hourly: false,
      seven: false
    }
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
  }

  getCurrentWeather(lat, lon) {
    fetch('http://localhost:3000/getWeather')
      .then((res)=> {
        console.log(res)
      })
      .catch((err)=> {
        console.log(err)
      })
  }

  render() {
    const { name } = this.props;
    return (
      <div className="app_container">
        <Topbar
          getCurrentWeather={this.getCurrentWeather}
        />
        <OptionsBar />
        <SevenDayForecast />
        <HourlyForecast />
        <TodaysForecast />
      </div>
    );
  }
}

export default hot(App);