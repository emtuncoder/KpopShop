import express from "express";
import Product from "../models/Product.js";
import ParentProduct from "../models/ParentProduct.js";
const router = express.Router();

// CREATE a new product
router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming product data:", req.body);

    const newProduct = new Product(req.body);
    const saved = await newProduct.save();

    // GẮN PRODUCT CON VÀO PARENT
    await ParentProduct.findByIdAndUpdate(
      saved.parent,
      { $push: { childProducts: saved._id } },
      { new: true }
    );

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving product:", err);
    res.status(500).json({ error: err.message });
  }
});


// READ all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("parent", "title");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Product not found" });

    // GỠ ID sản phẩm con ra khỏi parentProduct
    await ParentProduct.findByIdAndUpdate(
      deleted.parent,
      { $pull: { childProducts: deleted._id } }
    );

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/tag/:tag
router.get("/tag/:tag", async (req, res) => {
  try {
    const products = await Product.find({ tags: req.params.tag }).populate("category");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
