// local modules

// third-party models
const mongoose = require("mongoose"); //importing mongoose

const Schema = mongoose.Schema;

// define product schema
const productSchema = new Schema({
  batchNum: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  harvestDate: {
    type: Date,
    required: true,
  },
  farmer: {
    User: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    farmer_id: Schema.Types.ObjectId,
  },
  wholesaler: {
    User: {
      type: Schema.Types.ObjectId,
    },
    wholesaler_id: Schema.Types.ObjectId,
    purchased: Boolean,
  },
  distributor: {
    User: {
      type: Schema.Types.ObjectId,
    },
    disrtributor_id: Schema.Types.ObjectId,
    purchased: Boolean,
  },
  retailer: {
    User: {
      type: Schema.Types.ObjectId,
    },
    retailer_id: Schema.Types.ObjectId,
    purchased: Boolean,
  },
});

// creating Product model
module.exports = mongoose.model("Product", productSchema);
