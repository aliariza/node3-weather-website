const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXJ0dW1heSIsImEiOiJjbDBtY3psM2EwMHE4M2puM3M0MzNmMG80In0.0oopwy_kMR0bZBnIxrhoFw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const features = body.features[0];
      callback(undefined, {
        longitude: features.center[0],
        latitude: features.center[1],
        location: features.place_name,
      });
    }
  });
};

module.exports = geocode;
