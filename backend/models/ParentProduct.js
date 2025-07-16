import mongoose from "mongoose";

const parentProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    SKU: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    price: { type: Number, required: true },
    trackList: [{ type: String }],
    albumContents: [{ type: String }],
    releasedDate: { type: Date },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    imageDes: { type: String },
    label: { type: mongoose.Schema.Types.ObjectId, ref: "Label",required:true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },


    childProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    images: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual stock from children
parentProductSchema.virtual("stock").get(function () {
  // Assuming stock aggregation is handled elsewhere (e.g., when populating children)
  if (!this.childProducts || !Array.isArray(this.childProducts)) return 0;
  return this.childProducts.reduce((sum, child) => sum + (child.stock || 0), 0);
});

const ParentProduct = mongoose.model("ParentProduct", parentProductSchema);
export default ParentProduct;