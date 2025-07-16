// routes/category.routes.js
import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/test", async (req, res) => {
  try {
    const category = await Category.create({
      name: "Test Category"
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const category = await Category.findOne({ name });
    if (!category) return res.status(404).json({ error: "Label not found" });
    return res.json(category);
  }       
  const all = await Category.find();
  res.json(all);
});
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;