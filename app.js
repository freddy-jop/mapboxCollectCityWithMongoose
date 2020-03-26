const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { URI } = require('./config');

const app = express();

/* Routes */
// const tasksRoutes = require('./routes/tasksRoutes');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENVIRONMENT == "dev") app.use(morgan("dev"));

mongoose.connect(URI, {
  useNewUrlParser: true,
   useUnifiedTopology: true
});

// app.use('/api/tasks', tasksRoutes);

module.exports = app;