const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const fullDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const hours = ['12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'];

const getHours = function(date) {
  //0 index
  return date.getHours()
}

const getDayOfWeek = function(date) {
  //0 indexed
  return date.getDay()
}

const getDayOfMonth = function(date) {
  //1 indexed
  return date.getDate()
}

const getMonth = function(date) {
  //0 indexed
  return date.getMonth()
}

const getYear = function(date) {
  return date.getFullYear()
}

const getFutureWeekdays = function(date) {
  return days.slice(date.getDay(), date.getDay() + 8)
}

const getFutureMonthDays = function(date) {
  let currentMonthDay = date.getDate();
  let futureMonthDays = [];
  if (currentMonthDay + 7 < numberOfDays(date.getMonth(), date.getFullYear())) {
    for(var i=0; i<=7; i++) {
      futureMonthDays.push(currentMonthDay + i);
    }
  } else {
    let currentMonthLength = numberOfDays(date.getMonth(), date.getFullYear());
    let dayCount = currentMonthDay;
    while (dayCount <= currentMonthLength) {
      futureMonthDays.push(dayCount);
      dayCount++;
    }
    dayCount = 1;
    while (futureMonthDays.length < 8) {
      futureMonthDays.push(dayCount);
      dayCount++;
    }
  }
  return futureMonthDays
}

const numberOfDays = function(month, year) {
  let options = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (month === 1) {
    if (isLeapYear(year)) {
      return 29
    }
  }
  return options[month - 1]
}

const isLeapYear = function(year) {
  if (year % 4 === 0) {
    return true
  } else  {
    return false
  }
}

export {
  days, fullDays, months, hours, getHours, getDayOfWeek, getDayOfMonth, getMonth, getYear, getFutureWeekdays, getFutureMonthDays, numberOfDays, isLeapYear
}
