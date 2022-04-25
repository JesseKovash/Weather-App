import React from "react";
import { hot } from 'react-hot-loader/root';

function TodaysForecast() {
  return (
    <div className="today_container">
      <header className="today_header">
        <span>Dickinson, ND as of 2:11 MDT</span>
        </header>
      <div className="today_details_container">
        <div className="today_details">
          <h2 className="today_temp">50</h2>
          <h3 className="today_desc">Sunny</h3>
          <h3 className="today_hilo">Day 42 Night 23</h3>
        </div>
        <img className="today_icon"></img>
      </div>
    </div>
  )
}

export default TodaysForecast