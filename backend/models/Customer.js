// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone_number: { type: String },
  role: { type: String, enum: ["customer", "admin"], default: "customer" }
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
