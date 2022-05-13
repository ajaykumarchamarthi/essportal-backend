const express = require("express");
const router = express.Router();

// Importing Controller
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router.post("/login", authController.login);
router.post(
  "/signup",
  authController.protect,
  authController.restrictionTo("admin", "manager"),
  authController.signup
);
router.post("/forgotpassword", authController.forgotpassword);

router.get(
  "/getAllUsers",
  authController.protect,
  authController.restrictionTo("admin", "manager"),
  userController.getAllUsers
);

module.exports = router;
