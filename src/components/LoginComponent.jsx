import { useState } from "react";
import { InputComponent } from "../components/InputComponent";
import { Link, useNavigate } from "react-router-dom";
import { AnotherLogin } from "./AnotherLogin";
import { ToggleComponent } from "../components/ToggleComponent";
import axios from "axios";
import toast from "react-hot-toast";

export const LoginComponent = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1709/api/customers/login", form);
      toast.success("Login successful ✨");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Optional: save token/user info if backend returns it
      // localStorage.setItem("token", res.data.token);

      navigate("/"); // Go to home after login
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-card shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-500">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm">
            <ToggleComponent />
            <Link
              to="/forgot-password"
              className="text-sm hover:text-pink-500 flex justify-end"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="hover:text-pink-500">
            Sign Up
          </Link>
        </div>
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
