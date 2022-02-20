const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  productname: {
  type: String,
  required: true,
  maxLength: 255,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  complete: {
    type: Number,
    required: true,
    max: 2,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);