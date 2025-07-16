import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    variant: { type: String, required: true }, // e.g., "Ver. A", "Limited"
    stock: { type: Number, required: true },
    SKU: { type: String, required: true, unique: true, uppercase: true },
    images: [{ type: String }],
    price: { type: Number }, // Optional override price

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentProduct",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
