require("./database/config");

const User = require("./database/user");
const Events = require("./database/upcomingEvents");
const Deals = require("./database/deals");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  res.json("hello world");
});

app.get("/eventsList", async (req, res) => {
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
});

app.get("/deals", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
