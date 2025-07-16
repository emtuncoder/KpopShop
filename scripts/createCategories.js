import axios from "axios";

const wishlist = [
  { customer: "686e9a27fdbdf4c38835565a", product: "686deed568f2ba87171c0e67" },
  { customer: "686e9a27fdbdf4c38835565a", product: "686deed568f2ba87171c0e69" },
  { customer: "686e9a27fdbdf4c38835565a", product: "686deed668f2ba87171c0e6b" }
];

const createWishlist = async () => {
  for (const entry of wishlist) {
    try {
      const res = await axios.post("http://localhost:1709/api/wishlists", entry);
      console.log("✅ Created:", res.data);
    } catch (err) {
      console.error("❌ Error for", entry, err.response?.data || err.message);
    }
  }
};


createWishlist();
