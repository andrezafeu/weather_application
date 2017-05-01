const weather = require('./weather.js');

const locations = process.argv.slice(2);

locations.forEach(weather.get);