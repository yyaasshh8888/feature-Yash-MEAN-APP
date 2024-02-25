const express = require("express");
const router = express.Router();
const serverController = require("../controller/widget.server.controller");

var routeValidator = require("../../../../config/jwtHelper");
// Widget Routes
router.post(
  "/api/widget/create",
  routeValidator.verifyToken,
  serverController.create
); // CREATE Widget
router.delete("/api/widget/delete/:widgetId", serverController.widgetDelete); // DELETE Widget
router.get("/api/widget/fetch/:widgetId", serverController.widgetById); // GET Widget
router.put("/api/widget/update/:widgetId", serverController.widgetUpdateById); // UPDATE Widget
router.get(
  "/api/widget/list",
  routeValidator.verifyToken,
  serverController.widgetList
); // LIST Widget

module.exports = router;
