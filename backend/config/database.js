require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
