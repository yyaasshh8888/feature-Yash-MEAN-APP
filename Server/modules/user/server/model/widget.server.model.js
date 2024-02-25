var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * Widget Schema
 */
var WidgetSchema = new Schema({
  widgetType: {
    type: String,
    required: true,
  },
  name: { type: String },
  cols: {
    type: Number,
  },
  rows: {
    type: Number,
  },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  dashId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard",
  },
});

module.exports = mongoose.model("Widget", WidgetSchema);
