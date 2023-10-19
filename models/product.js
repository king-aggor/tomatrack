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
  fertilizer: {
    typeOfFertilizer: { type: String, require: true },
    npkRatio: {
      n: { type: Number },
      p: { type: Number },
      k: { type: Number },
    },
  },
  farmer: {
    User: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    farmer_id: Schema.Types.ObjectId,
    farmer_name: Schema.Types.String,
    farmer_location: Schema.Types.String,
  },
  wholesaler: {
    User: {
      type: Schema.Types.ObjectId,
    },
    wholesaler_id: Schema.Types.ObjectId,
    wholesaler_name: Schema.Types.String,
    wholesaler_location: Schema.Types.String,
    purchased: Boolean,
  },
  distributor: {
    User: {
      type: Schema.Types.ObjectId,
    },
    disrtributor_id: Schema.Types.ObjectId,
    distributor_name: Schema.Types.String,
    distributor_location: Schema.Types.String,
    purchased: Boolean,
  },
  retailer: {
    User: {
      type: Schema.Types.ObjectId,
    },
    retailer_id: Schema.Types.ObjectId,
    retailer_name: Schema.Types.String,
    retailer_location: Schema.Types.String,
    purchased: Boolean,
  },
});

// creating Product model
module.exports = mongoose.model("Product", productSchema);
