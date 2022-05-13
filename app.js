const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Importing Routes
const userRouter = require("./routes/userRoutes");
const leaveRouter = require("./routes/leaveRoutes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/leave", leaveRouter);

// Importing Error Handlers
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Welcome to CRM",
    },
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
