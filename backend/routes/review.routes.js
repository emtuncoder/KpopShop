// routes/shipment.review.js
import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { customer, product, rating, comment } = req.body;

    if (!customer || !product || !rating || !comment.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existing = await Review.findOne({ customer, product });
    if (existing) {
      return res.status(409).json({ error: "You already reviewed this product." });
    }

    const review = await Review.create({ customer, product, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error("❌ Error creating review:", err);
    res.status(500).json({ error: "Server error." });
  }
});




router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("customer", "first_name last_name")
      .sort({ date: -1 });

    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    res.json({
      reviews,
      averageRating: Math.round(averageRating * 10) / 10, // 1 decimal place
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
