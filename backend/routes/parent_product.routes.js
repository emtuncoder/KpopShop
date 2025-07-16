// backend/routes/parentProductRoutes.js
import express from "express";
import ParentProduct from "../models/ParentProduct.js";

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const parent = new ParentProduct(req.body);
        const saved = await parent.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("POST /parentproducts error:", error);
        res.status(500).json({ message: error.message });
    }
});

// READ ONE
router.get("/:id", async (req, res) => {

    try {
        const product = await ParentProduct.findById(req.params.id)
            .populate("category")
            .populate("childProducts")
            .populate("label")
            .populate("artist")
            ; // FIXED HERE

        if (!product) return res.status(404).json({ error: "Product not found" });
        console.log(product.childProducts); // phải là array chứa các object với .stock

        res.status(200).json(product);
    } catch (err) {
        console.error("Failed to fetch parent product:", err);
        res.status(500).json({ error: "Failed to fetch product", details: err.message });
    }
});

// get searchbar
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          title: { $regex: req.query.search, $options: "i" }, // case-insensitive search
        }
      : {};

    const products = await ParentProduct.find(keyword).populate("category");
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

//get product by artist
router.get("/artist/:artistId", async (req, res) => {
  try {
    const products = await ParentProduct.find({ artist: req.params.artistId }).populate("artist");
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found for this artist" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//get product by artist



router.put("/:id", async (req, res) => {
  try {
    // Remove _id from body if exists
    const { _id, ...updateData } = req.body;

    const updatedProduct = await ParentProduct.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await ParentProduct.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product", details: err });
    }
});

export default router;
