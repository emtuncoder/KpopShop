import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Key, Mail, User, Heart, ShoppingCart, PhoneCall, LocateIcon, LocationEdit, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [orderitems, setOrders] = useState([]);
  const [editData, setEditData] = useState({ address: "", phone_number: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState({
    address: false,
    phone_number: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
        setEditData({ address: parsedUser.address || "", phone_number: parsedUser.phone_number || "" });
      } catch (e) {
        console.error("❌ Failed to parse user:", e);
      }
    }
  }, []);

  useEffect(() => {
    const userId = user?.id || user?._id;
    if (userId) {
      axios.get(`http://localhost:1709/api/wishlists/${userId}`)
        .then(res => setWishlist(res.data))
        .catch(err => console.error("❌ Error loading wishlist:", err));
    }
  }, [user]);

  useEffect(() => {
    const userId = user?.id || user?._id;
    if (userId) {
      axios.get(`http://localhost:1709/api/order-items/${userId}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error("❌ Error loading Orders:", err));
    }
  }, [user]);

  const handleDeleteWishlistItem = async (productId) => {
    try {
      const customerId = user?.id || user?._id;
      await axios.delete("http://localhost:1709/api/wishlists/remove", {
        data: { customer: customerId, product: productId }
      });
      setWishlist(prev => prev.filter(item => item.product?._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("❌ Failed to remove wishlist item:", err);
      toast.error("Failed to remove item");
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const res = await axios.put(`http://localhost:1709/api/customers/${user.id || user._id}`, editData);
      const updatedUser = res.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("✅ Profile updated successfully");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      toast.error("❌ Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">You are not logged in.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-pink-100"
      >
        <img
          src="https://i.pinimg.com/1200x/fe/e6/bf/fee6bf8ace1771009b1101d4a902128f.jpg"
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-pink-300"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800 hover:text-pink-500">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-sm text-gray-500">Customer</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-pink-100 space-y-4"
      >
        <h3 className="text-lg font-semibold text-pink-500 mb-2">Account Information</h3>
        {["first_name", "last_name", "email"].map((field, index) => (
          <div key={index} className="flex items-center gap-2 p-3 bg-gray-100 rounded-md">
            {field === "email" ? <Mail className="text-gray-600 w-5 h-5" /> : <User className="text-gray-600 w-5 h-5" />}
            <span className="text-sm text-gray-800">
              {field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}: <strong>{user[field]}</strong>
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-md">
          <Key className="text-gray-600 w-5 h-5" />
          <span className="text-sm text-gray-800">Password: <strong>••••••••</strong></span>
        </div>

        {["address", "phone_number"].map((key, i) => (
          <div key={i} className="flex items-center gap-2 p-3 bg-gray-100 rounded-md justify-between">
            <div className="flex items-center gap-2 flex-1">
              {key === "address" ? <LocationEdit className="text-gray-600 w-5 h-5" /> : <PhoneCall className="text-gray-600 w-5 h-5" />}
              {isEditing[key] ? (
                <input
                  className="bg-transparent outline-none text-sm text-gray-800 w-full"
                  type="text"
                  value={editData[key]}
                  onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                />
              ) : (
                <span className="text-sm text-gray-800">
                  {key === "phone_number" ? "Phone" : "Address"}: <strong>{editData[key] || "N/A"}</strong>
                </span>
              )}
            </div>
            <button
              onClick={() => setIsEditing((prev) => ({ ...prev, [key]: !prev[key] }))}
              className="text-sm text-pink-500 hover:underline"
            >
              {isEditing[key] ? "Cancel" : "Edit"}
            </button>
          </div>
        ))}

        {(isEditing.address || isEditing.phone_number) && (
          <button
            onClick={async () => {
              await handleSave();
              setIsEditing({ address: false, phone_number: false });
            }}
            disabled={isSaving}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </motion.div>

      {/* Wishlist Section */}
      <div className="col-span-full mt-10 ">
        <h3 className="text-xl font-semibold text-pink-500 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" /> Wishlist
        </h3>
        {wishlist.length === 0 ? (
          <p className="text-gray-500 italic">No items in wishlist.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.li
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 bg-white border border-pink-100 rounded-md shadow p-4"
                >
                  <img
                    src={item.product?.images?.[0] || "/fallback.jpg"}
                    alt={item.product?.title}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-md font-semibold">{item.product?.title}</h4>
                    <p className="text-sm text-pink-400">₫{item.product?.price?.toLocaleString()}</p>
                    <Link
                      to={`/ProductDetail/${item.product?._id}`}
                      className="text-sm text-pink-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                  <button onClick={() => handleDeleteWishlistItem(item.product?._id)}>
                    <Trash2 className="text-red-400 hover:text-red-600" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {/* Orders Section */}
      <div className="col-span-full mt-10">
        <h3 className="text-xl font-semibold text-pink-500 mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Your Orders
        </h3>
        {orderitems.length === 0 ? (
          <p className="text-gray-500 italic">No orders found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <AnimatePresence>
              {orderitems.map((item) => (
                <motion.li
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-pink-100 rounded-md shadow p-4"
                >
                  <img
                    src={item.product?.images?.[0] || "/fallback.jpg"}
                    alt={item.product?.title}
                    className="w-full h-60 object-cover rounded mb-2"
                  />
                  <h4 className="font-semibold text-lg">{item.product?.parent?.title} - {item.product?.variant}</h4>
                  <p className="text-sm text-pink-400">₫{item.product?.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Order Date: {item.order?.order_date ? new Date(item.order.order_date).toLocaleDateString("vi-VN") : "N/A"}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfileComponent;
