const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentsModel = Schema({
  num_department: Schema.Types.Mixed,
  department_name: String,
  num_region: Number
});


module.exports = mongoose.model('departments', departmentsModel, 'departments');