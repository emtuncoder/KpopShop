import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { Toaster } from "react-hot-toast";
import { PaymentPage } from "../src/pages/Payment";
import { CollectionPage } from "../src/pages/CollectionPage";
import ChatPopupComponent from "./components/ChatPopupComponent";
// Admin Panel
import AdminLayout from "../src/admin/AdminLayout";
import Products from "../src/admin/ProductAdmin";
import Orders from "../src/admin/OrdersAdmin";
import Customers from "../src/admin/CustomersAdmin";
import Categories from "../src/admin/CategoriesAdmin";
import ParentProductAdmin from "../src/admin/ParentProductAdmin";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./admin/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* 🌸 Normal Pages */}
        <Route index element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ProductDetail/:id" element={<ProductDetailPage />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/CollectionPage" element={<CollectionPage />} />
        
        {/* 👩‍💻 Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="parentproducts" element={<ParentProductAdmin />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
