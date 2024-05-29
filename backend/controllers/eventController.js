const Events = require("./database/upcomingEvents");

exports.eventsList = async (req, res) => {
  const result = await Events.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No events data found",
    });
  }
};
