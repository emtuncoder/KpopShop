import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:1709/api/categories";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`${API}/${editingCategory._id}`, formData);
      } else {
        await axios.post(API, formData);
      }

      setFormData({ name: "" });
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Categories Admin</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 text-black bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category name"
          className="border p-2 flex-1"
          required
        />
        <button
          type="submit"
          className="bg-pink-400 text-white px-4 py-2 rounded"
        >
          {editingCategory ? "Update" : "Create"}
        </button>
      </form>

      {/* LIST */}
      <table className="w-full mt-10 table-auto border">
        <thead className="bg-black text-left text-white">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="text-black">
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-black px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesAdmin;
