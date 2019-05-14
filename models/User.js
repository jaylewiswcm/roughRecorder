var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.password = hash;
  next();
});

module.exports = mongoose.model("User", UserSchema);
