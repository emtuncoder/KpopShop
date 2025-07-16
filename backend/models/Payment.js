// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  payment_date: { type: Date, default: Date.now },
  payment_method: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;