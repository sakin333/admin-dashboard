const Company = require("./database/company");

exports.companies = async (req, res) => {
  const result = await Company.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No Companies found",
    });
  }
};
