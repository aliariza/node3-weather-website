const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=64364b73f137faf3b6c3af4201912ab6&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    const { current } = body;
    const {
      temperature: temp,
      feelslike: feelsLike,
      weather_descriptions: description,
      humidity,
    } = current;

    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      // const current = body.current;

      callback(
        undefined,
        `${description[0]}. It is currently ${temp} degrees out and feels like ${feelsLike} degrees out. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
