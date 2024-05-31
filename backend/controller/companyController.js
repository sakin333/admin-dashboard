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
