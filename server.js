// Required packages
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var favicon = require('serve-favicon');
// Required files
var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var brewsController = require('./controllers/brews.js');
var seedsController = require('./controllers/seeds.js');
// Insansiate app
var app = express();
// Connect db
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/coffee';
mongoose.connect(mongoURI);
// Set view engine
app.set('view engine', 'hbs')
// Middleware
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// morgan
app.use(logger('dev'));
// methodOverride
app.use(methodOverride('_method'));
// set public directory
app.use(express.static('public'));
// set favicon directory
app.use(favicon(__dirname + '/public/img/favicon.ico'));
// set up bcrypt
app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));
// set up controllers
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/brews', brewsController);
app.use('/seeds', seedsController);
// Homepage
app.get('/', function(req, res){
  res.render('home/home');
});
// Start listening
app.listen(process.env.PORT || 4000, function(){
  console.log('Now listening');
});
