var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')
var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/api/predict', (req, res) => {
  console.log(req.body);
  const dataML = req.body;

  try {
    console.log(JSON.stringify(dataML));
  }
  catch (errror) {
    console.error("Not a JSON response")
  }
  //prediction call to python api
  fetch('http://127.0.0.1:5000//api/titanic/predict', {
    method: 'POST',
    body: JSON.stringify(dataML),
    headers: { 'Content-Type': 'application/json', 'charset': 'utf8' },
  })
    .then(response => response.json())
    .then(jsonRes => res.send(jsonRes))
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
