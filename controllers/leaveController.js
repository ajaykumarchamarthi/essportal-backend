const catchAsync = require("./../utils/catchAsync");
const Leave = require("./../models/leaveModel");

exports.applyLeave = catchAsync(async (req, res, next) => {
  const { category, dateFrom, dateTo, numberOfDays, detailReason, userId } =
    req.body;

  const newLeave = await Leave.create({
    user: userId,
    category,
    dateFrom,
    dateTo,
    numberOfDays,
    detailReason,
  });
  res.status(200).json({
    status: "success",
    data: {
      newLeave,
    },
  });
});

exports.authorizeLeave = catchAsync(async (req, res, next) => {
  const { leaveId, status } = req.body;
  const _id = leaveId;
  await Leave.findByIdAndUpdate(_id, {
    status: status,
  });
  res.status(200).json({
    status: "success",
    message: `Leave Request ${status}`,
  });
});

exports.getAllLeaves = catchAsync(async (req, res, next) => {
  const Leaves = await Leave.find(req.query);

  res.status(200).json({
    status: "success",
    data: {
      Leaves,
    },
  });
});
