const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

atlasConnect = mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports = atlasConnect;