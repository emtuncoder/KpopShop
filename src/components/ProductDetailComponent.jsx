import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Heart } from "lucide-react";
import { QuantityBoxComponent } from "./QuantityBoxComponent";
import { motion, AnimatePresence } from "framer-motion";
import ReviewComponent from "./ReviewComponent";
import AddReviewForm from "./AddReviewForm";

export const ProductDetailComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:1709/api/parentproducts/${id}`);
        setProduct(res.data);
        if (res.data.childProducts?.length > 0) {
          setSelectedChild(res.data.childProducts[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id || !product?._id) return;

      try {
        const res = await axios.get(`http://localhost:1709/api/wishlists/${user.id}`);
        const found = res.data.some((item) => item.product?._id === product._id);
        setIsWishlisted(found);
      } catch (err) {
        console.error("❌ Error checking wishlist:", err.message);
      }
    };

    if (product) checkWishlist();
  }, [product]);

  useEffect(() => {
    if (product) {
      setSelectedChild(
        product.childProducts?.[0] || {
          images: product.images,
          price: product.price,
          stock: 0,
          variant: "Default",
        }
      );
    }
  }, [product]);

  const handleToggleWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return alert("Please log in to use wishlist.");

    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:1709/api/wishlists/remove`, {
          data: { customer: user.id, product: product._id },
        });
        setIsWishlisted(false);
      } else {
        await axios.post("http://localhost:1709/api/wishlists", {
          customer: user.id,
          product: product._id,
        });
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error("❌ Wishlist toggle error:", err);
      alert("❌ Failed to update wishlist.");
    }
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) return alert("Please log in to add to cart.");

    try {
      await axios.post("http://localhost:1709/api/carts", {
        customer: user.id,
        product: selectedChild._id,
        quantity,
      });
      alert("🛒 Added to cart!");
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      alert("❌ Failed to add to cart.");
    }
  };

  if (!product || !selectedChild) {
    return <div className="text-center py-20 text-gray-400 animate-pulse">Loading product...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedChild._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          src={selectedChild?.images?.[0] || "/fallback.jpg"}
          alt={product.title}
          className="rounded-2xl object-cover w-full max-h-[500px] border border-gray-200 shadow-md"
        />
      </AnimatePresence>

      <motion.div
        className="flex flex-col justify-between gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {product.title}
          </h1>
          <p className="text-pink-500 text-2xl font-semibold mb-4">
            {(quantity * (selectedChild.price || product.price)).toLocaleString()}₫
          </p>

          {/* Variant selector */}
          {product.childProducts.length > 0 && (
            <div className="mb-6 justify-items-center">
              <p className="font-semibold mb-2">Select Version:</p>
              <motion.div layout className="flex flex-wrap gap-2">
                {product.childProducts.map((child) => (
                  <motion.button
                    key={child._id}
                    layout
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedChild(child)}
                    className={`px-4 py-2 rounded-full text-sm border font-medium transition-all duration-200 shadow-sm ${
                      selectedChild._id === child._id
                        ? "bg-pink-500 text-white border-pink-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {child.variant}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}

          {/* Details */}
          <hr className="my-6" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-semibold">Release Date:</div>
            <div>{new Date(product.releasedDate).toLocaleDateString("vi-VN")}</div>
            <div className="font-semibold">Label:</div>
            <div>{product.label?.name}</div>
            <div className="font-semibold">Artist:</div>
            <div>{product.artist?.name}</div>
            <div className="font-semibold">Category:</div>
            <div>{product.category?.name}</div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="font-semibold mb-1">Description:</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <QuantityBoxComponent
            max={selectedChild.stock}
            onQuantityChange={(qty) => setQuantity(qty)}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition"
            >
              <ShoppingCart className="inline w-4 h-4 mr-2" /> Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`flex-1 border px-6 py-3 rounded-full font-medium transition-all shadow-md ${
                isWishlisted
                  ? "border-red-500 text-red-500 bg-rose-50"
                  : "border-pink-500 text-pink-500 hover:bg-rose-100"
              }`}
            >
              {isWishlisted ? (
                <Heart className="inline w-4 h-4 mr-2 fill-red-500" />
              ) : (
                <FaHeart className="inline w-4 h-4 mr-2" />
              )}
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="col-span-full mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {product.albumContents?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-2 border-b pb-1">In the Box</h2>
            <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
              {product.albumContents.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {product.trackList?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 border-b pb-1">Track List</h2>
            <ol className="list-decimal ml-6 space-y-1 text-sm text-gray-700">
              {product.trackList.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </>
        )}
      </motion.div>

      <div className="col-span-full border-t pt-10">
        <AddReviewForm productId={product._id} />
        <ReviewComponent productId={product._id} />
      </div>
    </div>
  );
};
