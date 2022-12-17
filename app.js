var createError = require('http-errors');
const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// DB connection 
require('./APP_API/models/db');

// var indexRouter = require('./APP_SERVER/routes/index');
//var usersRouter = require('./APP_SERVER/routes/users');
var apiRouter = require('./APP_API/routes/index');

var app = express();

var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'APP_API', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app_public/build')));
app.use(express.static(path.join(__dirname, 'public')));
// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', apiRouter);
//app.use('/users', usersRouter);
app.use('/api', apiRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app_public/build/index.html'));
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
