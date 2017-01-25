var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var BrewSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  beanType: String,
  brewMethod: String,
  massBeans: Number,
  grindSetting: Number,
  waterTemp: Number,
  brewTime: Number,
  massWater: Number,
  rating: Number,
  description: String
});

var UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  brews: [BrewSchema]
});


UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

BrewSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

var BrewModel = mongoose.model('Brew', BrewSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
  Brew: BrewModel,
  User: UserModel
}
