import { useState } from "react";
import { InputComponent } from "../components/InputComponent";
import { Link } from "react-router-dom";
import { AnotherLogin } from "./AnotherLogin";
import axios from "axios"; 
import { toast } from "react-hot-toast";

export const RegisterComponent = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Registering with:", form);

  try {
    const res = await axios.post("http://localhost:1709/api/customers", form);
    console.log("✅ Registered successfully:", res.data);

    toast.success("🎉 Registration successful!");
    // Optionally reset form or redirect
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  } catch (err) {
    console.error("❌ Registration failed:", err.response?.data || err.message);
    toast.error("❌ Registration failed: " + (err.response?.data?.message || "Unknown error"));
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-card shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-500">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputComponent
            label="First Name"
            name="first_name"
            type="text"
            placeholder="Sarocha"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <InputComponent
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Tun"
            value={form.last_name}
            onChange={handleChange}
            required
          />
          <InputComponent
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <InputComponent
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full mt-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center pt-5 items-center uppercase text-black">
          --------------------Or--------------------
        </div>
        <div>
          <AnotherLogin />
        </div>
      </div>
    </div>
  );
};
