const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function create_token(userId) {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: "3d" });
}

exports.sign_up = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.sign_up(name, password);
    const token = create_token(user._id);

    console.log("user:");
    console.log(user);
    console.log("token:");
    console.log(token);

    res.status(200).json({ name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.log_in = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.log_in(name, password);
    const token = create_token(user._id);

    res.status(200).json({ name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
