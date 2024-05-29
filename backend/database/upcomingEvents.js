const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  id: String,
  title: String,
  color: String,
  startDate: String,
  endDate: String,
});
const eventModel = new mongoose.model("events", eventsSchema);
module.exports = eventModel;
