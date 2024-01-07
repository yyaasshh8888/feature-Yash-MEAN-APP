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
  console.log("", process.mainModule.path);
  glob(
    "C://Users//yashj//OneDrive//Desktop//CODE//MEAN-APP-SETUP//MEAN-APP-SETUP//Server//" +
      "//modules//" +
      "**" +
      "//server//model//" +
      "*",
    function (err, files) {
      if (err) {
        console.error("Glob error:", err);
      } else {
        console.log("MODELS", files);
        files.forEach(function (routePath) {
          require(routePath);
        });
      }
    }
  );

  glob(
    "C://Users//yashj//OneDrive//Desktop//CODE//MEAN-APP-SETUP//MEAN-APP-SETUP//Server//" +
      "//modules//" +
      "**" +
      "//server//routes//" +
      "*",
    function (err, files) {
      if (err) {
        console.error("Glob error:", err);
      } else {
        console.log("ROUTES", files);
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
    username: "yash",
    password: "yash",
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