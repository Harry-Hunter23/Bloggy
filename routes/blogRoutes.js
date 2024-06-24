const express = require("express");
const {
  createBlogController,
  getAllBlogsController,
  updateBlogController,
  getBlogController,
  deleteBlogController,
} = require("../controllers/blogController");
const { getUserBlogController } = require("../controllers/userController");

const router = express.Router();

//get all blogs || get method
router.get("/all-blogs", getAllBlogsController);

// create a blog || post method
router.post("/create-blog", createBlogController);

//update a blog || put method
router.put("/update-blog/:id", updateBlogController);

//get a single blog || get method
router.get("/get-blog/:id", getBlogController);

//delete a blog || delete method
router.delete("/delete-blog/:id", deleteBlogController);

//get the blog by the user
router.get("/user-blog/:id", getUserBlogController);

module.exports = router;
