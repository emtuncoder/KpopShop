// backend/routes/searchRoute.js
import express from "express";
import ParentProduct from "../models/ParentProduct.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const results = await ParentProduct.find({
      title: { $regex: q, $options: "i" }, // case-insensitive
    }).limit(10);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
