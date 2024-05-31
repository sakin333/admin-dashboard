const mongoose = require("mongoose");

const dealsSchema = new mongoose.Schema({
  id: String,
  title: String,
  dealsAggregate: [
    {
      groupBy: {
        closeDateMonth: Number,
        closeDateYear: String,
      },
      sum: {
        value: Number,
      },
    },
  ],
});

const dealsModel = new mongoose.model("deals", dealsSchema);
module.exports = dealsModel;
