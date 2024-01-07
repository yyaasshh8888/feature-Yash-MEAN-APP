const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
var User = require("../modules/user/server/model/user.server.model");

passport.use(
  new localStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      console.log("test", "\n\n\n");
      User.findOne({ username: username }, (err, userRecord) => {
        if (err) done(err);
        else if (!userRecord) done(null, false, { message: "User not found!" });
        else if (!userRecord.verifyPassword(password))
          done(null, false, { message: "Wrong password!" });
        else done(null, userRecord);
      });
    }
  )
);
