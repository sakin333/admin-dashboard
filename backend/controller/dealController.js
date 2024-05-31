const Deals = require("../models/deals");

exports.deals = async (req, res) => {
  try {
    const result = await Deals.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "No deals found",
    });
  }
};
