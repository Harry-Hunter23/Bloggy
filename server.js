require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./database/dbConnect");
const app = express();
const PORT = process.env.PORT || 8080;

// Routes import
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route middlewares
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

// Static files
app.use(express.static(path.join(__dirname, "./client/dist")));

// Health check endpoint
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ message: "This is the Health API and it is functioning properly" });
});

// Catch-all route (placed last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Connecting to the database
connectDB();

app.listen(PORT, () => {
  console.log(
    `The app is running properly at port ${PORT} in ${process.env.dev_mode}`
  );
});
