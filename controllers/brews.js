var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Brew = require('../models/brew.js');
var authHelpers = require('../helpers/auth.js');

// Brews index
router.get('/', function(req, res){
  // res.send(req.session.currentUser);
  User.findById( req.session.currentUser._id)
    .exec(function(err, user){
      if(err) {console.log(err);}
      res.send(user.brews);
    });
});

module.exports = router;
