const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regionsModel = Schema({
  num_region: Number,
  region_name: String,
});


module.exports = mongoose.model('regions', regionsModel, 'regions');