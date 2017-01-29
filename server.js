var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var favicon = require('serve-favicon');

var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var brewsController = require('./controllers/brews.js');
var seedsController = require('./controllers/seeds.js');

var app = express();


var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/coffee';
mongoose.connect(mongoURI);

app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/brews', brewsController);
app.use('/seeds', seedsController);

app.get('/', function(req, res){
  res.render('home/home');
});


app.listen(process.env.PORT || 4000, function(){
  console.log('Now listening');
});
