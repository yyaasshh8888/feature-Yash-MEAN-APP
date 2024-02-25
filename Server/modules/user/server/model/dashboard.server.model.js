var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var DashboardSchema = new Schema({
  widgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widget",
    },
  ],
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
