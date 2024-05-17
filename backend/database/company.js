const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  id: String,
  name: String,
  avatarUrl: String,
  dealsAggregate: {
    sum: {
      value: Number,
    },
  },
});

const companyModel = new mongoose.model("company", companySchema);
module.exports = companyModel;
