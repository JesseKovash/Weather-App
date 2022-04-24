import React from "react";
import { hot } from 'react-hot-loader/root';

function Topbar (props) {

  return (
    <div className="topbar_container">
      <div className="logo">The US Weather</div>
      <div className="search_container">
        <input type="text" className="search_input" placeholder="Search City or Zip Code" onChange={(event)=>props.handleChange(event)}></input>
        <div className="search_lens" onClick={props.onLocationChange}>🔍</div>
      </div>
      <div className="c_or_f">
        <div className="celsius">C</div>
        <div className="fahrenheit">F</div>
      </div>
    </div>
  )
}

export default Topbar