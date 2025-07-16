// routes/shipment.routes.js
import express from "express";
import Shipment from "../models/Shipment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    const saved = await newShipment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
