// Required packages
var express = require('express');
var router = express.Router();
// Required files
var User = require('../models/user.js');
var Brew = require('../models/brew.js');
var authHelpers = require('../helpers/auth.js');



// Brew update: put
router.put('/:id/:brewId', authHelpers.authorize, function(req, res){
  User.findById(req.params.id)
    .exec(function(err, user){
      if(err) {console.log(err);}

      var brew = user.brews.id(req.params.brewId);
      // manually set parameters since there is no update() for subdocs
      brew.beanType= req.body.beanType;
      brew.brewMethod= req.body.brewMethod;
      brew.massBeans= req.body.massBeans;
      brew.grindSetting= req.body.grindSetting;
      brew.waterTemp= req.body.waterTemp;
      brew.brewTime= req.body.brewTime;
      brew.massWater= req.body.massWater;
      brew.rating= req.body.rating;
      brew.description= req.body.description;

      user.save();
      // Redirect to brew show page
      res.redirect(`/brews/${req.params.id}/${req.params.brewId}`);
    });
});


// New brew page
router.get('/new/:id', function(req, res){
  res.render('brews/create', {
    id: req.params.id
  })
});

// Brews create
router.post('/:id', function(req, res){
  // construct new brew
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
  // push new brew to user
  User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      user.brews.push(brew);
      user.save();
      // Redirect to brews index page
      res.redirect('/brews/' + req.params.id);
    });
});

// Brew update: show
router.get('/:id/edit/:brewId', authHelpers.authorize, function(req, res){
  User.findById(req.params.id)
  .exec(function(err, user){
    if(err) {console.log(err);}
    res.render('brews/edit', {
      brew: user.brews.id(req.params.brewId),
      id: req.params.id
    });
  });
});

// Brews delete
router.delete('/:id/:brewId', authHelpers.authorize, function(req, res){
  User.findById(req.params.id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      user.brews.id(req.params.brewId).remove();
      user.save();
      // Redirect to brews index page
      res.redirect(`/brews/${req.params.id}`);
    });
});

// Brews show
router.get('/:id/:brewId', authHelpers.authorize, function(req, res){
  User.findById(req.params.id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      res.render('brews/show', {
        brew: user.brews.id(req.params.brewId),
        id: req.params.id
      });
    });
});

// Brews index
router.get('/:id', authHelpers.authorize, function(req, res){
  User.findById( req.params.id)
  .exec(function(err, user){
    if(err) {console.log(err);}
    res.render('brews/index', {
      brews: user.brews,
      userId: req.params.id
    });
  });
});

module.exports = router;
