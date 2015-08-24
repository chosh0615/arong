var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var pi = require('./routes/pi');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var _SESSION_EXPIRE = 60 * 60 * 1000; //

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid: function(req) {
    return "" + new Date().getTime(); //genuuid() // use UUIDs for session IDs 
  },
  secret: 'SEAN00', 
  cookie: { secure: false, maxAge: _SESSION_EXPIRE },
  name: 'connect.sid',
  rolling: true,
  resave: true,
  saveUninitialized: true 
}));

app.use('/', function(req, res, next) {

  if(req.originalUrl.indexOf('/login') != 0 && !login.isLoggedIn(req) ) {
    res.redirect('/login');
  } 
  else {
    next();
  }

});

app.use('/', routes);
app.use('/users', users);
app.use('/pi', pi);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
