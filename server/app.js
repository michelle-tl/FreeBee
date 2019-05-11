var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

//var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const memoryCache = require('memory-cache');

var indexRouter = require('./routes/index');

var app = express();

app.use(cors({
  credentials: true,
}));
app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser);
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
