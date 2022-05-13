const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const leaveController = require("./../controllers/leaveController");

router.post("/applyLeave", authController.protect, leaveController.applyLeave);

router.patch(
  "/authorizeLeave",
  authController.protect,
  authController.restrictionTo("manager"),
  leaveController.authorizeLeave
);

router.get(
  "/getAllLeaves",
  authController.protect,
  authController.restrictionTo("manager"),
  leaveController.getAllLeaves
);

module.exports = router;
