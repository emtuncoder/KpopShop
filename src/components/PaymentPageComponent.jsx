import { useEffect, useState } from "react";
import axios from "axios";
import PaymentMethodComponent from "./PaymentMethodComponent";

export const PaymentPageComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [loading, setLoading] = useState(false);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id && !user?._id) return;
      try {
        const res = await axios.get(
          `http://localhost:1709/api/carts?customer=${user.id || user._id}`
        );
        setCartItems(res.data);
      } catch (err) {
        console.error("❌ Failed to load cart:", err.message);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("❗Please enter address and phone number.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:1709/api/orders/checkout", {
        customer: user.id || user._id,
        items: cartItems,
        shipping: { address, phone_number: phone },
      });
      alert("✅ Order placed successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Order failed:", err.response?.data || err.message);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-3xl font-bold text-pink-600 text-center">🛒 Checkout</h2>

      {/* Shipping Info */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <PaymentMethodComponent />

      </div>


      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Summary</h3>

        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between py-2 text-sm md:text-base">
              <span className="text-gray-700">
                {item.product.parent?.title || "Unnamed Product"} —{" "}
                <span className="text-gray-500">{item.product.variant}</span> ×{" "}
                <span >{item.quantity}</span>
              </span>
              <span className="text-pink-500 font-semibold">
                {(item.product.price * item.quantity).toLocaleString()}₫
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t text-lg font-semibold">
          <span>Total:</span>
          <span className="text-pink-600">{cartTotal.toLocaleString()}₫</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPageComponent;
