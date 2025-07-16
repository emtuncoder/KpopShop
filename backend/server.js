import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import orderItemRoutes from "./routes/orderitem.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import labelRoutes from "./routes/label.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import parentProducts from "./routes/parent_product.routes.js";
import searchRoute from "./routes/search.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";
//chatbox routes
import openrouterRoutes from './routes/openrouter.routes.js';
dotenv.config();

const app = express(); // ✅ DECLARE APP EARLY

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/parentproducts", parentProducts);
app.use("/api/labels", labelRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/carts", cartRoutes);
//search
app.use("/api/search", searchRoute);
//chatbox
app.use('/api/openrouter', openrouterRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Server listen
const PORT = process.env.PORT || 1709;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
