import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB");
    } catch (err) {
        console.error("❌ Failed to connect to DB", err);
        process.exit(1);
    }
};

const updateProductsFromCSV = async () => {
    await connectToDB();

    const csvFile = path.join("data", "KpopMerchDB.products.updated.csv");
    const updates = [];

    fs.createReadStream(csvFile)
        .pipe(csv())
        .on("data", (row) => {
            console.log("Row:", row); // ✅ debug

            const _id = row["_id"]?.replace(/^\uFEFF/, "").trim(); // fix BOM
            const imagesRaw = row["images[0]"];

            if (_id && imagesRaw) {
                const images = [imagesRaw.trim()]; // make it an array with one image
                updates.push({ _id, images });
            }

        })
        .on("end", async () => {
            console.log(`🔄 Updating ${updates.length} products...`);

            for (const { _id, images } of updates) {
                try {
                    await Product.findByIdAndUpdate(_id, { images });
                    console.log(`✅ Updated ${_id}`);
                } catch (err) {
                    console.error(`❌ Failed to update ${_id}:`, err.message);
                }
            }

            mongoose.disconnect();
            console.log("✅ Done.");
        });
};

updateProductsFromCSV();
