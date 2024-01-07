var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
/**
 * User Schema
 */
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: "",
  },
  username: {
    type: String,
    unique: "Username already exists",
    required: "Please fill in a username",
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    default: "",
  },

  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.verifyPassword = function (password) {
  return password == this.password;
};
UserSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, "SECRET#888", {
    expiresIn: "1h",
  });
};

module.exports = mongoose.model("User", UserSchema);
