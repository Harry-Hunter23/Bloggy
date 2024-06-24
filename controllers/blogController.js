const mongoose = require("mongoose");
const Blog = require("../models/blogModel.");
const User = require("../models/userModel");

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Unable to find the User", success: false });
    }
    // Create a new blog post
    const blog = new Blog({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blog,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error in the createBlogController",
      error: error.message,
    });
  }
};

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "username");
    //const blogs = await Blog.find();
    res.status(200).json({
      blogCount: blogs.length,
      success: true,
      message: "All blog posts retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error in the getAllBlogsController",
      error: error.message,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error in the updateBlogController",
      error: error.message,
    });
  }
};

exports.getBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post retrieved successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error in the getSingleBlogController",
      error: error.message,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error in the deleteBlogController",
      error: error.message,
    });
  }
};
