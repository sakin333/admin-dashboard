const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
