import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Package,
  List,
  ShoppingCart,
  Users,
  Layers,
  CompassIcon
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <CompassIcon size={20} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={20} /> },
    { to: "/admin/categories", label: "Categories", icon: <List size={20} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { to: "/admin/customers", label: "Customers", icon: <Users size={20} /> },
    { to: "/admin/parentproducts", label: "Parent Product", icon: <Layers size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-50 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-200 p-6 shadow-lg flex flex-col">
        <a href="/admin/dashboard" className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">
          Admin Panel
        </a>
        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-3 rounded-xl font-medium transition 
                  ${isActive ? "bg-pink-300 text-black shadow-md" : "text-gray-800 hover:bg-pink-300/70 hover:text-gray-900"}`}
              > 
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-white dark:bg-background text-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
