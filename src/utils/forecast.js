const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/92bbd7a7a1998f0e0d057810dfd91ab9/${latitude},${longitude}?lang=pt&units=si`;

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to service', undefined);
    } else if (body.error) {
      callback('Error in input', undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} É atualmente ${body.currently.temperature} graus. Com uma chance de chuva de ${body.currently.precipProbability}%, a temperature máxima é de ${body.daily.data[0].temperatureHigh} e mínima de ${body.daily.data[0].temperatureLow}`);
    }
  });
}

module.exports = forecast
