const mongoose = require('mongoose');

const departmentsModel = mongoose.Schema({
  num_departments: Number,
  departments_name: String,
  region_name: String,
});


module.exports = mongoose.model('departments', departmentsModel, 'departments');