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

// Brew update: show
router.get('/:id/edit/:brewId', authHelpers.authorize, function(req, res){
  Brew.findById(req.params.brewId)
  .exec(function(err, brew){
    if(err) {console.log(err);}
    res.send(brew);
  });
});

// Brew update: post
router.put('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findByIdAndUpdate(req.params.brewId, req.body)
    .exec(function(err, brew){
      if(err) {console.log(err);}
      brew.save();
      res.redirect(`/brews/${req.params.id}/${req.params.brewId}`);
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


// Brews delete
router.delete('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findByIdAndRemove(req.params.brewId)
    .exec(function(err){
      if(err) {console.log(err);}
      res.send('Brew deleted');
    });
});

// Brews show
router.get('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findById(req.params.brewId)
  .exec(function(err, brew){
    if(err) {console.log(err);}
    res.send(brew);
  });
});

module.exports = router;
