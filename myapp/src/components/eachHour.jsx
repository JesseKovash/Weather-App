import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { LocationContext } from '../App.js';
import {
  days, fullDays, months, getDayOfWeek, getDayOfMonth, getMonth, getYear, getFutureWeekdays, getFutureMonthDays, numberOfDays, isLeapYear
} from './../calcTime.js';

function EachHour(props) {
  const Values = useContext(LocationContext);
  let details = props.hourlyDetails;
  let dayOne = null;
  let dayTwo = null;
  let dayThree = null;
  console.log(details)

  const first = function(dayOptions) {
    console.log(details[0])
    let currentDay = new Date(dayOptions[0].dt * 1000);

    dayOne =
      <div className="hour_day">
        <span>{fullDays[getDayOfWeek(currentDay)]}, </span>
        <span>{months[getMonth(currentDay)]}</span>
        <span>{getDayOfMonth(currentDay)}</span>
      </div>
  }(details)

  const second = function(dayOptions) {

  }

  const third = function(dayOptions) {

  }

  return (
    <>
    {dayOne}
    </>
  )
}

export default EachHour