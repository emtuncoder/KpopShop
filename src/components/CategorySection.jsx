import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CategorySection = ({ title, categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get("http://localhost:1709/api/parentproducts");
        const filtered = res.data.filter(
          (p) =>
            p.category &&
            (p.category === categoryId || String(p.category._id) === categoryId)
        );
        setProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <section className="p-6 md:px-16 lg:px-24">
      <div className="pt-5 justify-items-center mb-6">
        <h2 className="text-3xl font-extrabold text-pink-500 drop-shadow-sm">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 pt-5 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            <Link to={`/ProductDetail/${product._id}`} className="block h-full">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-2xl transition duration-300 hover:brightness-105"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-pink-500 font-bold text-sm">
                  {(product.price).toLocaleString()}₫
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
