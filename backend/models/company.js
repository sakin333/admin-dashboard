const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  dealsAggregate: {
    sum: {
      value: {
        type: String,
        required: true,
      },
    },
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
  },
  foundedYear: {
    type: Number,
    required: true,
  },
  employees: {
    type: String,
    required: true,
  },
  revenue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
});

const companyModel = new mongoose.model("company", companySchema);
module.exports = companyModel;
