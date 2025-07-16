// routes/category.routes.js
import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// routes/cart.routes.js
router.get("/", async (req, res) => {
  try {
    const filter = req.query.customer ? { customer: req.query.customer } : {};

    const carts = await Cart.find(filter).populate({
      path: "product",
      populate: {
        path: "parent",
        model: "ParentProduct",
      },
    });

    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { customer, product } = req.body;
    if (!customer || !product) {
      return res.status(400).json({ error: "Missing customer or product ID." });
    }

    const removed = await Cart.findOneAndDelete({ customer, product });
    if (!removed) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    res.status(200).json({ message: "Removed from cart." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { customer, product, quantity } = req.body;

    if (!customer || !product || quantity == null) {
      return res.status(400).json({ error: "Missing customer, product, or quantity." });
    }

    const updated = await Cart.findOneAndUpdate(
      { customer, product },
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const saved = await newCart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;