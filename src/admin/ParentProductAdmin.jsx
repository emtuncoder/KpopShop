import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1709/api/parentproducts";

const ParentProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    SKU: "",
    description: "",
    price: "",
    category: "",
    artist: "",
    label: "",
    releasedDate:""
  });
  const [categories, setCategories] = useState([]);
  const [artists, setArtists] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:1709/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch categories", err);
    }
  };
  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:1709/api/artists");
      setArtists(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch artists", err);
    }
  };

  const fetchLabels = async () => {
    try {
      const res = await axios.get("http://localhost:1709/api/labels");
      setLabels(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch labels", err);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchArtists();
    fetchLabels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API}/${editingProduct._id}`, formData);
      } else {
        await axios.post(API, formData);
      }
      setFormData({ title: "", SKU: "", description: "", price: "", category: "", label: "", artist: "" ,releasedDate:""});
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      SKU: product.SKU,
      description: product.description,
      price: product.price,
      category: product.category,
      artist: product.artist,
      label: product.label,
      releasedDate: product.releasedDate
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Parent Products Admin</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black bg-white p-4 rounded shadow">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2" required />
        <input type="text" name="SKU" value={formData.SKU} onChange={handleChange} placeholder="SKU" className="border p-2" required />
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2" required />
        <input type="date" name="releasedDate" value={formData.releasedDate} onChange={handleChange} placeholder="Released Date" className="border p-2" required />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select name="artist" value={formData.artist} onChange={handleChange} className="border p-2" required>
          <option value="">Select Artist</option>
          {artists.map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>

        <select name="label" value={formData.label} onChange={handleChange} className="border p-2" required>
          <option value="">Select Label</option>
          {labels.map((l) => (
            <option key={l._id} value={l._id}>{l.name}</option>
          ))}
        </select>        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 col-span-full" />
        <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded col-span-full">
          {editingProduct ? "Update Product" : "Create Product"}
        </button>
      </form>

      {/* LIST */}
      <table className="w-full mt-10 table-auto border">
        <thead className="bg-black text-left">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">SKU</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Released Date</th>
            <th className="border px-4 py-2">Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="text-black">
              <td className="border px-4 py-2">{prod.title}</td>
              <td className="border px-4 py-2">{prod.SKU}</td>
              <td className="border px-4 py-2">{prod.price.toLocaleString()}₫</td>
              <td className="border px-4 py-2">{prod.releasedDate
              ? new Date(prod.releasedDate).toLocaleDateString("vi-VN")
              : "N/A"}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button onClick={() => handleEdit(prod)} className="bg-yellow-400 text-black px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="bg-red-500 text-black px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ParentProductAdmin;