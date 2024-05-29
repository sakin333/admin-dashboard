const mongoose = require("mongoose");

const uri =
  "mongodb+srv://beastglitch3:WzOCCPrMAVeyPoiO@cluster0.vuwn0mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
