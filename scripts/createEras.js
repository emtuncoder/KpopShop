// scripts/updateProductImages.js

import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const CSV_PATH = "./data/KpopMerchDB.products.csv"; // Adjust if saved elsewhere

async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
}

async function updateProductsFromCSV() {
  await connectToDB();

  const updates = [];

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on("data", (row) => {
      const id = row._id;
      const imagesRaw = row.images;

      if (!id || !imagesRaw) return;

      const images = imagesRaw
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img !== "");

      updates.push({ id, images });
    })
    .on("end", async () => {
      console.log(`🔍 Found ${updates.length} products to update.`);

      let success = 0;
      let failed = 0;

      for (const { id, images } of updates) {
        try {
          const updated = await Product.findByIdAndUpdate(
            id,
            { images },
            { new: true }
          );
          if (updated) success++;
          else failed++;
        } catch (err) {
          console.error(`❌ Failed to update ${id}`, err.message);
          failed++;
        }
      }

      console.log(`✅ Updated: ${success}, ❌ Failed: ${failed}`);
      mongoose.disconnect();
    });
}

updateProductsFromCSV();
