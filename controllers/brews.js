var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js');

// Brews index
router.get('/', function(req, res){
  res.send('Brews controller hit!');
});

module.exports = router;
