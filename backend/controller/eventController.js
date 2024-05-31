const Events = require("../models/upcomingEvents");

exports.eventsList = async (req, res) => {
  try {
    const result = await Events.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "No events data found",
    });
  }
};
