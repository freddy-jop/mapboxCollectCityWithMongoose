const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { URI } = require('./mongodbUri');

const app = express();

/* Routes */
const regionsRoutes = require('./routes/regionsRoutes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENVIRONMENT == "dev") app.use(morgan("dev"));

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/regions', regionsRoutes);

module.exports = app;