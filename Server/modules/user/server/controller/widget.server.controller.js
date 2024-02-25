var mongoose = require("mongoose");
var Widget = mongoose.model("Widget");
const passport = require("passport");
const _ = require("lodash");

/**
 * Create NEW Widget
 */
exports.create = function (req, res, next) {
  const payload = req.body;

  let record = new Widget(payload);

  record.save((err, result) => {
    if (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    } else res.status(200).send(payload);
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
  Widget.findByIdAndRemove(req.params.widgetId).exec(function (err, response) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Error deleting Widget " + req.params.widgetId,
      });
    } else {
      return res.status(200).json({
        message: "Widget deleted successfully",
      });
    }
  });
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
  console.log(updatePayload, req.params.widgetId);
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
        console.log(list);

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
