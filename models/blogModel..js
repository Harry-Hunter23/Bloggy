const mongoose = require("mongoose");
const User = require("./userModel");
const { Schema } = mongoose;

// Define the Blog schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
