var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Brew = require('../models/brew.js');
var authHelpers = require('../helpers/auth.js');

// Brews index
router.get('/', function(req, res){
  User.findById( req.session.currentUser._id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      res.send(user.brews);
    });
});

// Brews create
router.post('/new', function(req, res){
  var brew = new Brew({
    beanType: req.body.beanType,
    brewMethod: req.body.brewMethod,
    massBeans: req.body.massBeans,
    grindSetting: req.body.grindSetting,
    waterTemp: req.body.waterTemp,
    brewTime: req.body.brewTime,
    massWater: req.body.massWater,
    rating: req.body.rating,
    description: req.body.description
  });
  User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      user.brews.push(brew);
      user.save();
      res.send(user);
    });
});

module.exports = router;
