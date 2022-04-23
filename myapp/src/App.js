import React from "react";
import { hot } from 'react-hot-loader/root';
import SevenDayForecast from './components/sevenDay.jsx';
import HourlyForecast from './components/hourly.jsx';
import TodaysForecast from './components/today.jsx';
import Topbar from './components/topBar.jsx';
import OptionsBar from './components/optionsBar.jsx';

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <Topbar />
        <OptionsBar />
        <SevenDayForecast />
        <HourlyForecast />
        <TodaysForecast />
      </>
    );
  }
}

export default hot(App);