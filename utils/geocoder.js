const NoderGeocoder = require('node-geocoder');
const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'ddeRGkktv0S3Icym4fHeoWf8xtVfWJKK',
  formatter: null,
};

const geocoder = NoderGeocoder(options);

module.exports = geocoder;
