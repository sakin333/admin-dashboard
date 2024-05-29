const Deals = require("./database/deals");

exports.deals = async (req, res) => {
  const result = await Deals.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No deals found",
    });
  }
};
