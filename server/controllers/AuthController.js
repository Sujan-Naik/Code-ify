// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

 User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
