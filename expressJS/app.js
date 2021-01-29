
// import createError  from 'http-errors';

// import Button from './Button'; // Import a component from another file

var createError = require('http-errors');

var express = require('express');
// import express  from 'express';

var path = require('path');
// import path  from 'path';

var cookieParser = require('cookie-parser');
// import cookieParser  from 'cookie-parser';

var logger = require('morgan');
// import logger  from 'morgan';

var indexRouter = require('./routes/index');
// import indexRouter  from './routes/index';

var usersRouter = require('./routes/users');
// import usersRouter  from './routes/users';

var app = express();


app.use(express.static('public'))

// app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))


app.get('/', function (req, res) {
  res.send('Hello World!')
});



app.post('/', function (req, res) {
  res.send('Got a POST request')
});


app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
});


app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
