// Require packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Set promises to ES6 promises
mongoose.Promise = global.Promise;
// Set up schema for brews
var BrewSchema = new Schema({
  created_at: cde,
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
// Set up schema for users
var UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  brews: [BrewSchema]
});
// When modifying users
UserSchema.pre('save', function(next) {
  now = new Date();
  // update updated_at
  this.updated_at = now;
  // add created_at if it doesn't exist
  if (!this.created_at) { this.created_at = now }
  next()
});
// When modifying brews
BrewSchema.pre('save', function(next) {
  now = new Date();
  // update updated_at
  this.updated_at = now;
    // add created_at if it doesn't exist
  if (!this.created_at) { this.created_at = now }
  next()
});
// Create models for brew and user
var BrewModel = mongoose.model('Brew', BrewSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
  Brew: BrewModel,
  User: UserModel
}
