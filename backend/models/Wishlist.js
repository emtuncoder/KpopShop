// models/Wishlist.js
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  product:  { type: mongoose.Schema.Types.ObjectId, ref: "ParentProduct" ,unique:true },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;