// scripts/addProduct.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

const csvFilePath = path.join("data", "products.import.sample.csv");

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

const importProducts = async () => {
  await connectToDB();

  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", async () => {
      console.log(`🔍 Read ${results.length} products from CSV...`);

      for (const row of results) {
        try {
          const images = [];

          // Nếu có cột images[0], images[1], ..., xử lý thành mảng
          Object.keys(row).forEach((key) => {
            if (key.startsWith("images[") && row[key]) {
              images.push(row[key]);
            }
          });

          const newProduct = new Product({
            variant: row.variant,
            stock: parseInt(row.stock),
            SKU: row.SKU,
            images,
            price: parseInt(row.price),
            parent: row.parent,
          });

          await newProduct.save();
          console.log(`✅ Added product: ${row.SKU}`);
        } catch (err) {
          console.error(`❌ Failed to add product ${row.SKU}:`, err.message);
        }
      }

      mongoose.disconnect();
      console.log("🏁 Done importing products.");
    });
};

importProducts();
