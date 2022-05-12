import React, { useRef, useEffect }from "react";
import { hot } from 'react-hot-loader/root';

function Topbar(props) {
  let initialRender = useRef(true);
  const tempScaleElement = useRef(null);
  let displayedLocs = null;

  useEffect(()=> {
    if (!initialRender.current) {
      tempScaleElement.current.innerText = props.tempScale;
    }
  }, [props.tempScale])

  useEffect(()=>{
    initialRender.current = false;
  }, [])

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
        <span>US | &deg;</span>
        <span
        className="c_f_choice"
        onClick={props.changeTempScale}
        ref={tempScaleElement}
        >F</span>
      </div>
    </div>
  )
}

export default Topbar