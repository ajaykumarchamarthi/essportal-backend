const mongoose = require("mongoose");
const User = require("./userModel");

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Leave must belong to a user"],
  },
  category: {
    type: String,
    enum: ["Casual Leave", "Sick Leave", "Earned Leave"],
    default: "Casual Leave",
    required: [true, "Please provide a valid reason"],
  },
  dateFrom: {
    type: Date,
    required: [true, "Please provide a valid from date"],
  },
  dateTo: {
    type: Date,
    required: [true, "Please provide a valid to date"],
  },
  numberOfDays: {
    type: Number,
    min: 1,
    required: [true, "Please provide number of days"],
  },
  detailReason: {
    type: String,
    required: [true, "Please provide a valid detailed reason for leave"],
  },
  status: {
    type: "String",
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

// Embedding

// leaveSchema.pre("save", async function (next) {
//    const userData = await User.findById(this.user);
//    this.user = await userData;
//    next();
//  });

leaveSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "user",
    select: "firstName lastName",
  });
  next();
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
