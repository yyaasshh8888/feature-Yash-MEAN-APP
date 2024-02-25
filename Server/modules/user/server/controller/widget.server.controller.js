var mongoose = require("mongoose");
var Widget = mongoose.model("Widget");
var Dashboard = mongoose.model("Dashboard");
const passport = require("passport");
const _ = require("lodash");

/**
 * Create NEW Widget
 */
exports.create = async function (req, res, next) {
  const payload = req.body;
  payload["widgetType"] = !payload["widgetType"]
    ? "test"
    : payload["widgetType"];

  payload.cols = 2;
  payload.rows = 2;
  let record = new Widget(payload);

  let dashRecord = await Dashboard.findById({ _id: record.dashId });
  dashRecord.widgets =
    dashRecord.widgets == null
      ? [record._id]
      : dashRecord.widgets.push(record._id);

  record.save(async (err, result) => {
    if (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    } else {
      let updatedDash = await Dashboard.findOneAndUpdate(
        { _id: dashRecord._id },
        dashRecord,
        {
          new: true,
        }
      );
      res.status(200).send(payload);
    }
  });
};

/**
 * Widget List
 */
exports.widgetList = function (req, res, next) {
  Widget.find().exec((err, listResponse) => {
    if (err)
      return res
        .status(404)
        .json({ status: false, message: "Error listing Widget." });
    else {
      return res.status(200).json({
        list: listResponse,
      });
    }
  });
};
/**
 * Widget Delete
 */
exports.widgetDelete = function (req, res, next) {
  Widget.findByIdAndRemove(req.params.widgetId, { new: true }).exec(
    async function (err, response) {
      if (err) {
        return res.status(400).json({
          status: false,
          message: "Error deleting Widget " + req.params.widgetId,
        });
      } else {
        let deletedWidget = await Dashboard.findByIdAndUpdate(response.dashId, {
          $pull: { widgets: response._id },
        });
        return res.status(200).json({
          message: "Widget deleted successfully",
        });
      }
    }
  );
};
/**
 * Widget BY ID
 */
exports.widgetById = function (req, res, next) {
  Widget.findById(req.params.widgetId).exec(function (err, response) {
    if (err) {
      return res
        .status(400)
        .json({ status: false, message: "Error finding Widget." });
    } else {
      return res.status(200).send(response);
    }
  });
};
/**
 * Widget BY ID
 */
exports.widgetUpdateById = function (req, res, next) {
  let updatePayload = req.body;
  Widget.findOneAndUpdate({ _id: req.params.widgetId }, updatePayload, {
    new: true,
  }).exec(function (err, response) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: getErrorMessage(err) || "Error updating Widget.",
      });
    } else {
      Widget.find().exec(function (err, list) {
        return res.status(200).send(response);
      });
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
      errorMsg = "Error occurred while creating Widget.";

      break;
  }
  return errorMsg;
}
