require("./database/config");

const User = require("./database/user");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
