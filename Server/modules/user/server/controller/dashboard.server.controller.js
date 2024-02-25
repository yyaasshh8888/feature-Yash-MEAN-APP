var mongoose = require("mongoose");
var Dashboard = mongoose.model("Dashboard");
const passport = require("passport");
const _ = require("lodash");

/**
 * Create NEW Dashboard
 */
exports.create = function (req, res, next) {
  const payload = req.body;

  let record = new Dashboard(payload);

  record.save((err, result) => {
    if (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    } else res.status(200).send(payload);
  });
};

/**
 * Dashboard List
 */
exports.dashboardList = function (req, res, next) {
  Dashboard.find().exec((err, listResponse) => {
    if (err)
      return res
        .status(404)
        .json({ status: false, message: "Error listing dashboard." });
    else {
      return res.status(200).json({
        list: listResponse,
      });
    }
  });
};
/**
 * Dashboard Delete
 */
exports.dashboardDelete = function (req, res, next) {
  Dashboard.findByIdAndRemove(req.params.dashId, { new: true }).exec(
    async function (err, response) {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "Error deleting dashboard " + req.params.dashId,
        });
      } else {
        let Widget = mongoose.model("Widget");
        let removeList = await Widget.remove({ dashId: response._id });
        return res.status(200).json({
          message: "Dashboard deleted successfully",
        });
      }
    }
  );
};
/**
 * Dashboard BY ID
 */
exports.dashboardById = function (req, res, next) {
  Dashboard.findById(req.params.dashId)
    .populate("widgets")
    .exec(function (err, response) {
      if (err) {
        return res
          .status(400)
          .json({ status: false, message: "Error finding dashboard." });
      } else {
        return res.status(200).send(response);
      }
    });
};
/**
 * Dashboard BY ID
 */
exports.dashboardUpdateById = function (req, res, next) {
  let updatePayload = req.body;
  Dashboard.findOneAndUpdate({ _id: req.params.dashId }, updatePayload, {
    new: true,
  }).exec(function (err, response) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: getErrorMessage(err) || "Error updating dashboard.",
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
      errorMsg = "Error occurred while creating dashboard.";

      break;
  }
  return errorMsg;
}
