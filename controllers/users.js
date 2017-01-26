var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js');

router.get('/signup', function(req, res){
  res.render('users/signup');
});

router.post('/', authHelpers.createSecure, function(req, res){
     var user = new User({
       email: req.body.email,
       password_digest: res.hashedPassword
     });

     user.save(function(err, user){
       if(err) {console.log(err);}
       res.send(user);
     });
});

module.exports = router;
