const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.server.controller");

var routeValidator = require("../../../../config/jwtHelper");
// Dashboard Routes
router.post(
  "/api/dashboard/create",
  routeValidator.verifyToken,
  dashboardController.create
); // CREATE Dashboard
router.delete(
  "/api/dashboard/delete/:dashId",
  dashboardController.dashboardDelete
); // DELETE Dashboard
router.get("/api/dashboard/fetch/:dashId", dashboardController.dashboardById); // GET Dashboard
router.put(
  "/api/dashboard/update/:dashId",
  dashboardController.dashboardUpdateById
); // UPDATE Dashboard
router.get(
  "/api/dashboard/list",
  routeValidator.verifyToken,
  dashboardController.dashboardList
); // LIST Dashboard

module.exports = router;
