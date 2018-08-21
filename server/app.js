const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api');

// Using express app
const app = express();

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add cors filter
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Mount all routes on / path
app.use('/', routes);

// Route not found
app.use((req, res, next) => {
  const error = new Error('No Routes Found');
  error.status = 404;
  next(error);
});

// Error while handling routes
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
