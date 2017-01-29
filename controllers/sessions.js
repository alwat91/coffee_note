// Require packages
var express = require('express');
var router = express.Router();
// Require files
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
// Show user login page
router.get('/login', function(req, res) {
  res.render('users/login');
})
// Log in user
router.post('/login', authHelpers.loginUser, function(req, res){
  // Find user matching username and password
  User.findOne({
    email: req.body.email,
    password_digest: req.body.password
  })
  // redirect to brews index
    .exec(function(err, user){
      if(err) {console.log(err);}
      res.redirect('/brews/' + req.session.currentUser._id);
    });
});


// LOGOUT USER
router.delete('/logout', function(req, res){
  req.session.destroy(function(){
      res.redirect('/');
  });
});

module.exports = router;
