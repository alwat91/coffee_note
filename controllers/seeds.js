// Require packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
// Require files
var Brew = require('../models/brew');
var User = require('../models/user');
// Route for seeding
router.get('/', function(req, res){
  // Remove existing data (Removed for deployment)
  // Brew.remove({}, function(err){
  //   console.log(err);
  // });
  //
  // User.remove({}, function(err){
  //   console.log(err);
  // });
  // Example brew 1
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
  // Example brew 2
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
  // Example user containing examble brews
  var exUser = new User({
    email: 'a@a.com',
    password_digest: bcrypt.hashSync('a', bcrypt.genSaltSync(10)),
    created_at: new Date(),
    updated_at: new Date(),
    brews: [brew1, brew2]
  });
  // Save new user
  exUser.save(function(err){
    if(err) {console.log(err);}
    console.log("User created!");
  });
  // Send confirmation with option to return home
  res.send('Seeded <br><a href="/">Return Home</a>');
});

module.exports = router;
