const http = require('http');
const api = require('./api.json');

function printError(error) {
    console.log(error.message);
}

function printMessage(location, weather, temperature) {
  const message = `The weather in ${location} is ${weather} and the temperature now is: ${temperature} kelvin`;
  console.log(message);
}

function getWeather(location) {
    try {
        const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api.key}`, response => {
                                    if (response.statusCode === 200) {
                                        let body = "";
                                        response.on('data', data => {
                                            body += data.toString();
                                        });
                                        response.on('end', () => {
                                            try {
                                                const weather = JSON.parse(body)
                                                printMessage(weather.name, weather.weather[0].main, weather.main.temp)
                                            } catch (error) {
                                                printError(error);
                                            }
                                        });
                                    } else {
                                        const message = `There was an error getting the weather for ${location} (${http.STATUS_CODES[response.statusCode]})`;
                                        const statusCodeError = new Error(message);
                                        printError(statusCodeError);
                                    }
                                  });
        request.on('error', printError)
    } catch (error) {
        // Malformed URL error
        printError(error);
    }
}

module.exports.get = getWeather;