var mongoose = require("mongoose");
var User = mongoose.model("User");
const passport = require("passport");
const _ = require("lodash");
/**
 * Send User
 */
exports.me = function (req, res) {
  console.log("YASH");
  res.json({ data: "Yash" });
};
/**
 * Authenticate
 */
exports.authenticate = function (req, res, next) {
  console.log("IN authenticate");
  passport.authenticate("local", (err, user, info) => {
    console.log(user, err, info);
    if (err) return res.status(400).json(err);
    else if (user) res.status(200).json({ token: user.generateJwt() });
    else res.status(404).json(info);
  })(req, res);
};

/**
 * Create NEW USER
 */
exports.create = function (req, res, next) {
  const payload = req.body;

  let record = new User(payload);

  record.save((err, result) => {
    if (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    } else res.status(200).send(payload);
  });
};

/**
 * User Profile
 */
exports.userProfile = function (req, res, next) {
  console.log("\n\n\n77777777777777777777", "USER ", req);
  User.findOne({ _id: req._id }, (err, userRecord) => {
    if (!userRecord) {
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    } else
      return res.status(200).json({
        status: true,
        user: _.pick(userRecord, ["username", "email"]),
      });
  });
};
/**
 * User List
 */
exports.userList = function (req, res, next) {
  console.log("\n\nLIST", "USER ", req);

  User.find().exec((err, users) => {
    if (err)
      return res
        .status(404)
        .json({ status: false, message: "Error listing users." });
    else {
      console.log("\n\n\n", users);
      return res.status(200).json({
        users: users,
      });
    }
  });
};
/**
 * User Delete
 */
exports.userDelete = function (req, res, next) {
  User.findByIdAndRemove(req.params.userId).exec(function (err, response) {
    if (err) {
      return res
        .status(400)
        .json({ status: false, message: "Error deleting user." });
    } else {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }
  });
};
/**
 * User BY ID
 */
exports.userById = function (req, res, next) {
  User.findById(req.params.userId).exec(function (err, response) {
    if (err) {
      return res
        .status(400)
        .json({ status: false, message: "Error finding user." });
    } else {
      return res.status(200).send(response);
    }
  });
};
/**
 * User BY ID
 */
exports.userUpdateById = function (req, res, next) {
  let updatePayload = req.body;
  User.findOneAndUpdate({ _id: req.params.userId }, updatePayload, {
    new: true,
  }).exec(function (err, response) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: getErrorMessage(err) || "Error updating user.",
      });
    } else {
      return res.status(200).send(response);
    }
  });
};
/**
 * Error message handler
 */
function getErrorMessage(err) {
  let errorMsg = "";
  switch (err.code) {
    case 11000:
      errorMsg = "Duplicate key error, " + Object.keys(err.keyPattern)[0] + ".";
      break;

    default:
      errorMsg = "Error occurred while creating user.";

      break;
  }
  return errorMsg;
}
