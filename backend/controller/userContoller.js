const User = require("../models/user");

exports.register = async (req, res) => {
  const { email, username, password, role } = req.body;
  const avatarUrl = "link";

  try {
    let repeatedEmail = await User.findOne({ email });
    if (repeatedEmail) {
      return res
        .status(409)
        .json({ error: "Account with same email already exists" });
    }

    let data = new User({
      email,
      username,
      password,
      avatarUrl,
      role,
    });
    let result = await data.save();
    result = result.toObject();
    delete result.password;

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Enter required fields" });
  }

  try {
    let data = await User.findOne(req.body).select("-password");
    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: "Enter Valid Information" });
    }

    res.status(200).json({ success: true, data: data.toObject() });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "No users data found",
    });
  }
};
