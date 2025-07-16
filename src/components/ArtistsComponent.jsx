import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ArtistsComponent = () => {
  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:1709/api/artists");
        setArtists(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch artists", err);
      }
    };
    fetchArtists();
  }, []);

  // Fetch all products or by artist
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedArtist
          ? `http://localhost:1709/api/parentproducts/artist/${selectedArtist}`
          : `http://localhost:1709/api/parentproducts/`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [selectedArtist]);

  return (
    <div className="px-6 pt-10">
      {/* Artist Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedArtist(null)}
          className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
            selectedArtist === null
              ? "bg-pink-500 text-white border-pink-500 shadow-md"
              : "text-pink-500 border-pink-300 hover:bg-pink-100"
          }`}
        >
          All Artists
        </button>
        {artists.map((artist) => (
          <button
            key={artist._id}
            onClick={() => setSelectedArtist(artist._id)}
            className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
              selectedArtist === artist._id
                ? "bg-pink-500 text-white border-pink-500 shadow-md"
                : "text-pink-500 border-pink-300 hover:bg-pink-100"
            }`}
          >
            {artist.name}
          </button>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-pink-500 mb-8 text-center">
        {selectedArtist
          ? `🎤 Products by ${artists.find((a) => a._id === selectedArtist)?.name || "Artist"}`
          : "✨ All Products"}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-lg transition"
          >
            <Link to={`/ProductDetail/${product._id}`}>
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-60 object-cover rounded-lg mb-3"
              />
              <h2 className="font-semibold text-base truncate text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <p className="text-sm text-pink-500 mt-1 font-semibold">
                {product.price.toLocaleString()}₫
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsComponent;
