// get all the tools needed
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var morgan = require('morgan');
var app = express();
var port     = process.env.PORT || 5555;
var passport = require('passport');
var flash    = require('connect-flash');

// config passport and connect to DB
require('./config/passport')(passport);

// set up express
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const SERVER_SECRET = 'ohgodpleasenobug';

// routes
require('./app/routes.js')(app, passport, SERVER_SECRET); // load our routes and pass in our app and fully configured passport

app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
