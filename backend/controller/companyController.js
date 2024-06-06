const Company = require("../models/company");

exports.companies = async (req, res) => {
  try {
    const result = await Company.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "No companies found",
    });
  }
};

exports.editCompany = async (req, res) => {
  try {
    if (!req.query.companyId) {
      return res.status(400).json({ error: "Company Id required" });
    }

    let data = await Company.findOne({ _id: req.query.companyId });
    if (!data) {
      return res.status(400).json({ error: "No company found " });
    }

    const fieldsToUpdate = {};
    const allowedFields = [
      "name",
      "description",
      "dealsAggregate",
      "industry",
      "location",
      "foundedYear",
      "employees",
      "revenue",
      "website",
      "contactEmail",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "location") {
          fieldsToUpdate["location.city"] = req.body[field];
        } else if (field === "dealsAggregate") {
          fieldsToUpdate["dealsAggregate.sum.value"] = req.body[field];
        } else {
          fieldsToUpdate[field] = req.body[field];
        }
      }
    });

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ error: "Please enter required fields" });
    }

    let result = await Company.findOneAndUpdate(
      { _id: req.query.companyId },
      { $set: fieldsToUpdate },
      { new: true }
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "Error editing company details" });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    if (!req.query.companyId) {
      return res.status(400).json({ error: "Company Id required" });
    }

    let data = await Company.findOne({ _id: req.query.companyId });
    if (!data) {
      return res.status(400).json({ error: "No company found " });
    }

    await Company.deleteOne({ _id: req.body.companyId });
    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting company" });
  }
};
