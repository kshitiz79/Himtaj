// orders.model.js

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: String, // Optional: You can auto-generate or use _id
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    amount: Number,
    email: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["UPI", "COD"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
