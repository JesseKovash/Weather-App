
  exports.Geo = function(searchTerm) {
    nodeGeocoder = require('node-geocoder');

    let options = {
      provider: 'openstreetmap'
    };

    let geoCoder = nodeGeocoder(options);
    return geoCoder.geocode(searchTerm)
  }


