var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

router.get('/login', function(req, res) {
  res.send('login page');
})

router.post('/login', authHelpers.loginUser, function(req, res){
  User.findOne({
    email: req.body.email,
    password_digest: req.body.password
  })
    .exec(function(err, user){
      if(err) {console.log(err);}
      res.send(req.session);
    });
});


// DESTROY USER METHOD: DANGER!
// router.delete('/', function(req, res){
//   User.findOneAndRemove({email: req.session.currentUser.email}, function(err){
//     if(err) {console.log(err);}
//     res.send(req.session);
//   });
// })

// LOGOUT USER
router.delete('/', function(req, res){
  req.session.destroy(function(){
      res.send(req.session);
  });
});

module.exports = router;
