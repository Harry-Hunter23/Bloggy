const express = require("express");
const {
  registerController,
  getAllUsers,
  loginController,
} = require("../controllers/userController");

const router = express.Router();
//Get all users || get Method
router.get("/all-users", getAllUsers);

//Create a new User || Post method
router.post("/register", registerController);

//login the User || Post method
router.post("/login", loginController);

module.exports = router;
