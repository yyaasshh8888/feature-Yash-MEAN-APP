const { Router } = require("express");
const express = require("express");
const router = express.Router();

var users = require("../controller/user.server.controller");
var routeValidator = require("../../../../config/jwtHelper");
// User Routes

// Setting up the users profile api
router.get("/api/users/me", users.me); // GET CURRENT USER
router.post("/api/authenticate", users.authenticate); // AUTHENTICATE USER
router.get("/api/user/user-profile", users.userProfile); // USER WITH TOKEN VERIFICATION MIDDLEWARE

router.post("/api/user/create", users.create); // CREATE USER
router.delete("/api/user/delete/:userId", users.userDelete); // DELETE USER
router.get("/api/user/fetch/:userId", users.userById); // GET USER
router.put("/api/user/update/:userId", users.userUpdateById); // UPDATE USER
router.get("/api/user/list11", users.userList); // LIST USER

module.exports = router;
