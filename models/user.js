// third-party modules
const mongoose = require("mongoose"); //importing mongoose

const Schema = mongoose.Schema;

// defining user schema
const userSchema = new Schema({
  orgName: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: String,
    },
    Farmer: String,
    Wholesaler: String,
    Retailer: String,
    Distributor: String,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
