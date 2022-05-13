const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, (req, res) => {
  console.log(`App Runing on port ${PORT}`);
});
