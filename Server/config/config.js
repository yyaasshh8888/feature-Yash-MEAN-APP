var _ = require("lodash"),
  glob = require("glob"),
  path = require("path");

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      console.log("\n\n", files);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], "");
            }
          } else {
            file = file.replace(excludes, "");
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};
/**
 * Initialize global configuration files
 */

var initGlobalConfigFiles = function (app) {
  // Appending files
  var config = {
    files: {},
  };
  config.files = {
    server: {},
  };
  // The below route should be ideally pwd.cwd()
  const pwdPath =
    "C://Users//yashj//OneDrive//Desktop//CODE//MEAN-APP-SETUP//Server//";
  glob(
    pwdPath + "//modules//" + "**" + "//server//model//" + "*",
    function (err, files) {
      if (err) {
        console.error("Glob error:", err);
      } else {
        files.forEach(function (routePath) {
          console.log(routePath);
          require(routePath);
        });
      }
    }
  );

  glob(
    pwdPath + "//modules//" + "**" + "//server//routes//" + "*",
    function (err, files) {
      if (err) {
        console.error("Glob error:", err);
      } else {
        files.forEach(function (routePath) {
          app.use("/", require(path.resolve(routePath)));
        });
      }
    }
  );
};

module.exports.createDeafultUser = function () {
  let mongoose = require("mongoose"),
    UserModel = mongoose.model("User");
  console.log("🚀🚀🚀\n  Creating default user");

  let defaulUser = new UserModel({
    email: "demo@gmail.com",
    username: "admin",
    password: "admin",
  });
  defaulUser.save(function (err, createdUserRecord) {
    if (err) {
      console.log("\n🚀🚀🚀  Failed to create default user");
    } else {
      console.log("\n🚀🚀🚀  Created default user successfully");
    }
  });
};

module.exports.initGlobalConfigFiles = initGlobalConfigFiles;
