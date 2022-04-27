import React from "react";
import { hot } from 'react-hot-loader/root';

function Topbar(props) {

  let displayedLocs = null;
  if (props.locations.length > 0) {
    displayedLocs = <div className="results_container">
    {props.locations?.map((oneLoc) => {
      return <div className="location_option" onClick={() => props.onLocationChange(oneLoc)}>{oneLoc.address}</div>
    })}</div>
  }
  return (
    <div className="topbar_container">
      <div className="logo">
        <p className="logo_p">The</p>
        <p className="logo_p">US</p>
        <p className="logo_p">Weather</p>
      </div>
      <div className="search_container">
        <input type="text" className="search_input" placeholder="Search City or Zip Code" onChange={(event) => props.handleChange(event)} value={props.searchInput}></input>
        {displayedLocs}
      </div>
      <div className="c_or_f">
        <div className="celsius">C</div>
        <div className="fahrenheit">F</div>
      </div>
    </div>
  )
}

export default Topbar