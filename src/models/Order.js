const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, default: "RON" },
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);