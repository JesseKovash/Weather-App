import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js'

function FutureDays() {
  const Values = useContext(LocationContext);

  return (
  <div>
    <div>futuredays</div>
  </div>
  )
}

export default FutureDays