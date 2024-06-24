const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Replace with your MongoDB URI
    await mongoose.connect(process.env.MongoDb_uri);
    console.log(
      `MongoDB has been connected successfully ${mongoose.connection.host}`
    );
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
