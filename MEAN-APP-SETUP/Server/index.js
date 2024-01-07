/**
 * Module Imports
 */
const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const passport = require("passport");
const PORT = 8000;
const path = require("path");

// Config
const Config = require("./config/config");

// Basic middlewares
app.use(cors());
app.use(compression());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.Router());
app.use(passport.initialize());

/**
 * Test API
 */
// app.get("/", (req, res) => {
//   res.send("OK");
// });

// Initialization
try {
  async function connectDB() {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017/pulsar");
    console.log("🚀🚀🚀 Database connected successfully\n");
  }
  connectDB();
  Config.initGlobalConfigFiles(app);
  // Passport config
  require("./config/passportConfig");
  const UserModel = mongoose.model("User");

  // Dist Integration
  app.use(express.static(path.join(__dirname, "dist/AuthDemo")));
  app.set("view engine", "pug");
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "/dist/AuthDemo/index.html"));
  // });
  try {
    UserModel.count().exec(function (err, userRecordCound) {
      if (!err) {
        if (userRecordCound == 0) Config.createDeafultUser();
      }
    });
  } catch (error) {}
} catch (error) {
  console.log("🚀 ~ error", error);
}

app.listen(PORT, () => {
  console.log(`\n🚀🚀🚀 App running on ${PORT}`);
});
