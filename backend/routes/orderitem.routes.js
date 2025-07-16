// routes/orderItem.routes.js
import express from "express";
import OrderItem from "../models/OrderItem.js";
import Order from "../models/Order.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newItem = new OrderItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/order-items/:userId
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Find all orders for the customer
    const orders = await Order.find({ customer: userId });

    // 2. Get their order IDs
    const orderIds = orders.map(o => o._id);

    // 3. Find all order items related to these orders
    const items = await OrderItem.find({ order: { $in: orderIds } })
      .populate({
        path: 'product',
        populate: { path: 'parent', model: 'ParentProduct' }
      })
      .populate('order');

    res.json(items);
  } catch (err) {
    console.error("❌ Failed to fetch order items:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;