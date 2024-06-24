const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the credentials",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. You need to log in.",
        success: false,
      });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving the new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      message: "New user registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(". "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error in the registerController",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      userCount: users.length,
      message: "all users have been shown",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "SErver error in the catch block of the getAll users",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the credentials",
      });
    }
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in the catch block of the loginController",
      error: error.message,
    });
  }
};

exports.getUserBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await User.findById(id).populate({
      path: "blogs",
      populate: {
        path: "user",
        select: "username",
      },
    });
    if (!userBlog) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this Id" });
    }
    return res.status(200).json({
      success: true,
      message: "User blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error in the getUser blog controller",
    });
  }
};
