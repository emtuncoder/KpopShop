// routes/order.routes.js
import express from "express";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/checkout", async (req, res) => {
  const { customer, items } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // 1. Create Order
    const newOrder = await Order.create({
      customer,
      total_price: totalPrice,
    });

    // 2. Create OrderItems
    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create({
          order: newOrder._id,
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })
      )
    );

    // 3. Clear user's cart
    await Cart.deleteMany({ customer });
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.userId }).populate("customer");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "first_name email"); // chỉ lấy name & email
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
