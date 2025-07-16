// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  },
  images: [String] // optional: let users upload review photos
});


const Review = mongoose.model("Review", reviewSchema);
export default Review;