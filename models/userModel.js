const mongoose = require("mongoose");
const Blog = require("./blogModel.");
const { Schema } = mongoose;
const validator = require("validator");

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      validate: {
        validator: function (v) {
          return (
            validator.isAlpha(v.replace(/\s/g, "")) &&
            v.length >= 2 &&
            v.length <= 30
          );
        },
        message: (props) =>
          `${props.value} is not a valid name. Username should have 2 to 30 letters only.`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
