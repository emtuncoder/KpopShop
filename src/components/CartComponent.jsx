import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useDrawer } from "./contexts/DrawerContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { openDrawer, toggleDrawer } = useDrawer();
  const isOpen = openDrawer === "cart";
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:1709/api/carts?customer=${user.id}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("❌ Failed to load cart:", err.response?.data || err.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete("http://localhost:1709/api/carts/remove", {
        data: { customer: user.id, product: productId },
      });
      setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("❌ Remove failed:", err.message);
    }
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put("http://localhost:1709/api/carts/update", {
        customer: user.id,
        product: productId,
        quantity: newQty,
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("❌ Quantity update failed:", err.message);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleCheckout = async () => {
    if (!user?.id || cartItems.length === 0) return;

    try {
      const res = await axios.post("http://localhost:1709/api/orders/checkout", {
        customer: user.id,
        items: cartItems,
      });

      alert("✅ Order placed successfully!");
      setCartItems([]); // Clear cart
      toggleDrawer("cart"); // Close cart drawer
    } catch (err) {
      console.error("❌ Checkout failed:", err.response?.data || err.message);
      alert("❌ Failed to place order");
    }
  };


  return (
    <>
      <button
        onClick={() => toggleDrawer("cart")}
        className="p-1 rounded-full text-foreground hover:text-pink-500 transition-colors duration-500"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-[420px] p-5 overflow-y-auto bg-white shadow-lg transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="relative">
          <h5 className="inline-flex items-center mb-6 text-lg font-bold text-gray-900">
            <ShoppingCart className="w-5 h-5 mr-2.5" />
            Your Cart
          </h5>
          <button
            onClick={() => toggleDrawer("cart")}
            className="absolute top-4 right-4 text-pink-500 hover:text-pink-600 rounded-full w-8 h-8 flex items-center justify-center transition"
            aria-label="Close cart"
          >
            <IoClose className="w-5 h-5" />
          </button>

          {cartItems.length === 0 ? (
            <div className="mt-16 text-center text-sm text-gray-400">
              <p>Your cart is currently empty 💔</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex border border-gray-200 rounded-lg p-3 items-center gap-4"
                  >
                    <img
                      src={item.product?.images?.[0] || "/fallback.jpg"}
                      alt={item.product?.title}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {item.product?.parent?.title || "Unnamed Product"} -{item.product?.variant}
                      </p>
                      <p className="text-sm font-bold text-pink-500 mt-1">
                        {(item.quantity * item.product?.price).toLocaleString()}₫
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-pink-500"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-pink-500"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total:</span>
                  <span className="text-pink-500">{cartTotal.toLocaleString()}₫</span>
                </div>
                <button
                  onClick={() => navigate("/PaymentPage")}
                  className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white text-sm py-3 rounded-full font-semibold transition"
                >
                  Go to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartComponent;
