// routes/shipment.routes.js
import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newWishlist = new Wishlist(req.body);
    const saved = await newWishlist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/remove", async (req, res) => {
  try {
    const { customer, product } = req.body;
    const removed = await Wishlist.findOneAndDelete({ customer, product });
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/:userId", async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ customer: req.params.userId }).populate("product");
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
