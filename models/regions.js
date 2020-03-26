const mongoose = require('mongoose');

const regionsModel = mongoose.Schema({
  num_region: Number,
  region_name: String,
  departments: [{ type: Schema.Types.ObjectId, ref: 'departments' }],
});


module.exports = mongoose.model('regions', regionsModel, 'regions');