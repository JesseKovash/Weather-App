import React from "react";
import { hot } from 'react-hot-loader/root';

function SevenDayForecast (props) {
  let displayedLocs = null;
  console.log('locations: ', props.locations)
  if (props.locations.length > 0)  {
    displayedLocs = props.locations?.map((oneLoc) => {
      return <div className="location_option" onClick={()=>props.onLocationChange(oneLoc)}>{oneLoc.address}</div>
      // return <div>location</div>
    })
  }

  return (
    <div>SevenDay
      {displayedLocs}
    </div>

  )
}

export default SevenDayForecast