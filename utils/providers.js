const axios = require('axios');
const { regions } = require('./configUri');

const regionsProvider = axios.create({
  baseURL: regions.endPoint
});

regionsProvider.defaults.responseType = 'json';

module.exports = {
  regionsProvider
}