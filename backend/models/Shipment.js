// models/Shipment.js
import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  shipment_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date
  },
  address: {
    type: String, // instead of ref to Customer, store real address used for this order
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  tracking_number: {
    type: String,
    unique: true,
    sparse: true
  },
  shipping_provider: {
    type: String,
    default: "VNPost" // or J&T, DHL, etc.
  }
});


const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
