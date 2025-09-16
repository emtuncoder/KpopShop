import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1709/api/products";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [parents, setParents] = useState([]);
  const [formData, setFormData] = useState({
    variant: "",
    stock: "",
    SKU: "",
    images: "",
    price: "",
    parent: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  const fetchParents = async () => {
    try {
      const res = await axios.get("http://localhost:1709/api/parentproducts");
      setParents(res.data);
    } catch (err) {
      console.error("Error fetching parent products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchParents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
        images: formData.images.split(",").map((img) => img.trim()), // comma separated
      };

      if (editingProduct) {
        await axios.put(`${API}/${editingProduct._id}`, payload);
      } else {
        await axios.post(API, payload);
      }

      setFormData({
        variant: "",
        stock: "",
        SKU: "",
        images: "",
        price: "",
        parent: "",
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      variant: product.variant,
      stock: product.stock,
      SKU: product.SKU,
      images: product.images?.join(", "),
      price: product.price,
      parent: product.parent,
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
      <h1 className="text-2xl font-bold mb-6">Child Products Admin</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black bg-white p-4 rounded shadow">
        <input type="text" name="variant" value={formData.variant} onChange={handleChange} placeholder="Variant (e.g., Ver. A)" className="border p-2" required />
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="border p-2" required />
        <input type="text" name="SKU" value={formData.SKU} onChange={handleChange} placeholder="SKU" className="border p-2" required />
        <input type="text" name="images" value={formData.images} onChange={handleChange} placeholder="Images (comma separated URLs)" className="border p-2" />
        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="Price (optional)" className="border p-2" />
        <select
          name="parent"
          value={formData.parent}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Select Parent Product</option>
          {parents.map((parent) => (
            <option key={parent._id} value={parent._id}>
              {parent.title}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-pink-400 text-white px-4 py-2 rounded col-span-full">
          {editingProduct ? "Update Child Product" : "Create Child Product"}
        </button>
      </form>

      {/* LIST */}
      <table className="w-full mt-10 table-auto border">
        <thead className="bg-black text-left text-white">
          <tr>
            <th className="border px-4 py-2">Variant</th>
            <th className="border px-4 py-2">SKU</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Parent ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="text-black">
              <td className="border px-4 py-2">{prod.variant}</td>
              <td className="border px-4 py-2">{prod.SKU}</td>
              <td className="border px-4 py-2">{prod.stock}</td>
              <td className="border px-4 py-2">{prod.price?.toLocaleString()}₫</td>
              <td className="border px-4 py-2">{prod.parent?.title || "N/A"}</td>
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

export default ProductAdmin;
