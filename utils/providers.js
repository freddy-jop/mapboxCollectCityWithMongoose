const axios = require('axios');
const { regions, departments } = require('./configUri');

const regionsProvider = axios.create({
  baseURL: regions.endPoint
});

const departmentsProvider = axios.create({
  baseURL: departments.endPoint
});

regionsProvider.defaults.responseType = 'json';
departmentsProvider.defaults.responseType = 'json';

module.exports = {
  regionsProvider,
  departmentsProvider
}