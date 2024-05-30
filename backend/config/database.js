require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
