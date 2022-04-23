import React from "react";
import { hot } from 'react-hot-loader/root';

function OptionsBar () {
  return (
    <div className="options_container">
      <div className="option option_today">Today</div>
      <div className="option option_hourly">Hourly</div>
      <div className="option option_seven">7 Day</div>
      <div className="option option_radar">Radar</div>
    </div>
  )
}

export default OptionsBar