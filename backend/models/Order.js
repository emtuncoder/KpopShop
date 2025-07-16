// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  order_date: { type: Date, default: Date.now },
  total_price: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
