import React, { useContext } from "react";
// import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';

function OptionsBar () {
  const Values = useContext(LocationContext);

  return (
    <div className="options_container">
      <div className="option option_today" onClick={()=>{Values.changeDisplay('today')}}>Today</div>
      <div className="option option_hourly" onClick={()=>Values.changeDisplay('hourly')}>Hourly</div>
      <div className="option option_seven" onClick={()=>Values.changeDisplay('seven')}>7 Day</div>
      <div className="option option_radar" onClick={()=>Values.changeDisplay('radar')}>Radar</div>
    </div>
  )
}

export default OptionsBar