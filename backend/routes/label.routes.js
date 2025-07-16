// routes/label.routes.js
import express from "express";
import Label from "../models/Label.js";
import { LiaBell } from "react-icons/lia";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newLabel = new Label(req.body);
    const saved = await newLabel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// /routes/artist.js
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const label = await Label.findOne({ name });
    if (!label) return res.status(404).json({ error: "Label not found" });
    return res.json(label);
  }
  const all = await Label.find();
  res.json(all);
});


router.get("/", async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;