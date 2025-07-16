// backend/scripts/syncChildProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import ParentProduct from "../models/ParentProduct.js";

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    process.exit(1);
  }
};

const syncChildProducts = async () => {
  try {
    const parents = await ParentProduct.find();
    console.log(`🔄 Found ${parents.length} parent products`);

    for (const parent of parents) {
      const children = await Product.find({ parent: parent._id }, "_id");
      const childIds = children.map((child) => child._id);

      await ParentProduct.findByIdAndUpdate(parent._id, {
        childProducts: childIds,
      });

      console.log(`✅ Synced ${childIds.length} child products for "${parent.title}"`);
    }

    console.log("🎉 All parent products synced.");
  } catch (err) {
    console.error("❌ Sync failed:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

await connectToDB();
await syncChildProducts();
