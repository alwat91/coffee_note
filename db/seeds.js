var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/coffee');

var Brew = require('../models/brew');
var User = require('../models/user');

Brew.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});

var brew1 = new Brew({
  created_at: new Date(),
  updated_at: new Date(),
  beanType: "Stumptown Hair Bender",
  brewMethod: "Chemex",
  massBeans: 42,
  grindSetting: 10,
  waterTemp: 205,
  brewTime: 240,
  massWater: 700,
  rating: 5,
  description: "This brew was so gud"
});

var brew2 = new Brew({
  created_at: new Date(),
  updated_at: new Date(),
  beanType: "1000 Faces Koko Buni",
  brewMethod: "Aeropress",
  massBeans: 17,
  grindSetting: 5,
  waterTemp: 205,
  brewTime: 90,
  massWater: 200,
  rating: 4,
  description: "This brew was purty gud"
});


// brew1.save(function(err){
//   if(err) {console.log(err);}
//   console.log("Brew created!");
// });
//
// brew2.save(function(err){
//   if(err) {console.log(err);}
//   console.log("Brew created!");
// });
var bob = new User({
  email: 'a@a.com',
  password_digest: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
  created_at: new Date(),
  updated_at: new Date(),
  brews: [brew1, brew2]
});

bob.save(function(err){
  if(err) {console.log(err);}
  console.log("User created!");
});
