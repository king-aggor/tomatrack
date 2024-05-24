// third-party modules
const mongoose = require("mongoose"); //importing mongoose
require("dotenv").config();

const dBConnectionString = process.env.DB_CONNECTION_STRING;

const dbConnect = mongoose
  .connect(dBConnectionString)
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// export mongooseConnect
exports.mongooseConnect = dbConnect;
