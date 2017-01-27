var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Brew = require('../models/brew.js');
var authHelpers = require('../helpers/auth.js');



// Brew update: put
router.put('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findByIdAndUpdate(req.params.brewId, req.body)
    .exec(function(err, brew){
      if(err) {console.log(err);}
      brew.save();
      console.log(brew);
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
      console.log('post hit');
      user.brews.push(brew);
      user.save();
      res.redirect('/brews/' + req.params.id);
    });
});

// Brew update: show
router.get('/:id/edit/:brewId', authHelpers.authorize, function(req, res){
  Brew.findById(req.params.brewId)
  .exec(function(err, brew){
    if(err) {console.log(err);}
    res.render('brews/edit', {
      brew: brew,
      id: req.params.id
    });
  });
});

// Brews delete
router.delete('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findByIdAndRemove(req.params.brewId)
    .exec(function(err, brew){
      if(err) {console.log(err);}
      brew.save();
      res.redirect(`/brews/${req.params.id}`);
    });
});

// Brews show
router.get('/:id/:brewId', authHelpers.authorize, function(req, res){
  Brew.findById(req.params.brewId)
    .exec(function(err, brew){
      if(err) {console.log(err);}
      res.render('brews/show', {
        brew: brew,
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
