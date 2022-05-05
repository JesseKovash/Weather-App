const windDirection = function(deg) {
  let deg = (Math.round(deg / 10)) * 10;
  if (deg === 10 || deg === 350 || deg === 360) {
    return 'N'
  }
  if (deg === 20 || deg === 30) {
    return 'NNE'
  }
  if (deg === 40 || deg === 50) {
    return 'NE'
  }
  if (deg === 60 || deg === 70) {
    return 'ENE'
  }
  if (deg === 80 || deg === 90 || deg === 100) {
    return 'E'
  }
  if (deg === 110 || deg === 120) {
    return 'ESE'
  }
  if (deg === 130 || deg === 140) {
    return 'SE'
  }
  if (deg === 150 || deg === 160) {
    return 'SSE'
  }
  if (deg === 170 || deg === 180 || deg === 190) {
    return 'S'
  }
  if (deg === 200 || deg === 210) {
    return 'SSW'
  }
  if (deg === 220 || deg === 230) {
    return 'SW'
  }
  if (deg === 240 || deg === 250) {
    return 'WSW'
  }
  if (deg === 260 || deg === 270 || deg === 280) {
    return 'W'
  }
  if (deg === 290 || deg === 300) {
    return 'WNW'
  }
  if (deg === 310 || deg === 320) {
    return 'NW'
  }
  if (deg === 330 || deg === 340) {
    return 'NNW'
  }
}

const windMPH = function(speed) {
  return Math.round(speed * 2.237)
}

const windKMH = function(speed) {
  return Math.round(speed * 3.6)
}

export { windDirection, windMPH, windKMH }